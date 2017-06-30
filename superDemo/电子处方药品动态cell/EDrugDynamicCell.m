//
//  EDrugDynamicCell.m
//  SuperDemo
//
//  Created by Rany on 2017/6/23.
//  Copyright © 2017年 Rany. All rights reserved.
//

#define DOSAGEARR @[@"粒",@"颗",@"片",@"mg",@"g",@"ml",@"袋",@"瓶",@"支",@"滴",@"喷",@"贴",@"盒"]
#define DOSAGESTRING @"粒",@"颗",@"片",@"mg",@"g",@"ml",@"袋",@"瓶",@"支",@"滴",@"喷",@"贴",@"盒"

#define FREQUENCYARR @[@"1次/天",@"2次/天",@"3次/天",@"1次/周",@"1次/月",@"其他"]
#define FREQUENCYSTRING @"1次/天",@"2次/天",@"3次/天",@"1次/周",@"1次/月",@"其他"

#define USAGEARR @[@"口服",@"外服",@"内服",@"皮下注射",@"静脉滴注",@"肌肉注射",@"其他"]
#define USAGESTRING @"口服",@"外服",@"内服",@"皮下注射",@"静脉滴注",@"肌肉注射",@"其他"

#import "EDrugDynamicCell.h"
#import "EDrugParameView.h"
#import "NSString+intJudge.h"
#define kTopViewH 53.0f
#define kParameViewH 36.0f

@interface EDrugDynamicCell()<EDrugParameViewDelegate,UIActionSheetDelegate,UIAlertViewDelegate>
{
    BOOL _isShowNorms;//是否显示规格
    BOOL _isShowUseage;//是否显示用法
    BOOL _isShowDosage;//是否显示用量 + 频次
    BOOL _isShowCount;//是否显示数量
    
    UIView *_topView;
    UIView *_parameContentView;
    UIView *_separatorLine;
    
    UILabel *_normasTtileLabel;
    
    UIButton *_closeButton;
    
    EDrugParameView *_useageView;
    EDrugParameView *_rateView;
    EDrugParameView *_dosageView;
    EDrugParameView *_amountView;
    
}
@property(nonatomic, strong) NSMutableArray *parameViewArray; //动态视图数组
@end
@implementation EDrugDynamicCell

#pragma mark - init
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
                  IsShowNorms:(int)isShowNorms
                 IsShowUseage:(int)isShowUseage
                 IsShowDosage:(int)isShowDosage
                  IsShowCount:(int)isShowCount
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    
    if (self) {
        _isShowCount = isShowCount;
        _isShowDosage = isShowDosage;
        _isShowUseage = isShowUseage;
        _isShowNorms = isShowNorms;
        [self setupView];
        [self addParameView];
    }
    
    return self;
}

#pragma mark - 懒加载

-(NSMutableArray *)parameViewArray
{
    if (!_parameViewArray) {
        _parameViewArray = [NSMutableArray array];
    }
    
    return _parameViewArray;
}

#pragma mark - setupView

- (void)setupView
{
    //topView
    _topView = [[UIView alloc]init];
    _topView.backgroundColor = [UIColor whiteColor];
    [self.contentView addSubview:_topView];
    
    //药品名
    self.titleLabel = [[UILabel alloc]init];
    self.titleLabel.font = [UIFont boldSystemFontOfSize:17];
    [_topView addSubview:self.titleLabel];
    
    //关闭按钮
    _closeButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [_closeButton setImage:[UIImage imageNamed:@"icon_drug_shut"] forState:UIControlStateNormal];
    [_topView addSubview:_closeButton];
    [_closeButton addTarget:self action:@selector(closeButtonAction) forControlEvents:UIControlEventTouchUpInside];
    
    //规格：
    _normasTtileLabel = [[UILabel alloc]init];
    _normasTtileLabel.font = [UIFont systemFontOfSize:14];
    _normasTtileLabel.text = @"规格:";
    [_topView addSubview:_normasTtileLabel];
    
    //规格参数
    self.normsLabel = [[UILabel alloc]init];
    self.normsLabel.font = [UIFont systemFontOfSize:14];
    self.normsLabel.textColor = [UIColor lightGrayColor];
    [_topView addSubview:self.normsLabel];
    
    //分隔线
    _separatorLine = [[UIView alloc]init];
    _separatorLine.backgroundColor = [UIColor groupTableViewBackgroundColor];
    [self.contentView addSubview:_separatorLine];
    
    //药品参数视图
    _parameContentView = [[UIView alloc]init];
    _parameContentView.backgroundColor = [UIColor whiteColor];
    [self.contentView addSubview:_parameContentView];
    
}

- (void)addParameToArray
{
    if (_isShowUseage) {
        
        _useageView = [EDrugParameView createDrugParameViewWithViewType:ParameViewTypeUsage];
        [self.parameViewArray addObject:_useageView];
    }
    
    if (_isShowDosage) {
        
        _rateView = [EDrugParameView createDrugParameViewWithViewType:ParameViewTypeRate];
        _dosageView = [EDrugParameView createDrugParameViewWithViewType:ParameViewTypeDosage];
        [self.parameViewArray addObject:_rateView];
        [self.parameViewArray addObject:_dosageView];
    }
    
    if (_isShowCount) {
        
        _amountView = [EDrugParameView createDrugParameViewWithViewType:ParameViewTypeAmount];
        [self.parameViewArray addObject:_amountView];
    }
}

//添加药品参数视图到parameView
- (void)addParameView
{
    [self addParameToArray];
    
    [self.parameViewArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
       
        EDrugParameView *parameView = (EDrugParameView *)obj;
        
        parameView.delegate = self;
        
        [self.contentView addSubview:parameView];
        
        //行号
        NSInteger row = idx/2;
        
        //列号
        NSInteger col = idx%2;
        
        CGFloat width = SCREEN_WIDTH/2-1;
        
        [parameView mas_makeConstraints:^(MASConstraintMaker *make) {
           
            make.size.mas_equalTo(CGSizeMake(width, kParameViewH));
            make.left.equalTo(self.contentView).offset(col*(width+1));
            make.top.equalTo(_separatorLine.mas_bottom).offset(row*(kParameViewH+1));
            
        }];
        
        //添加分隔线
        if (col > 0) {
            
            UIView *rowline = [[UIView alloc]init];
            [_parameContentView addSubview:rowline];
            rowline.backgroundColor = [UIColor groupTableViewBackgroundColor];
            [rowline mas_makeConstraints:^(MASConstraintMaker *make) {
                
                make.size.mas_equalTo(CGSizeMake(SCREEN_WIDTH, 1));
                make.left.equalTo(self.contentView);
                make.top.equalTo(_separatorLine.mas_bottom).offset(kParameViewH);
                
            }];
            
        }
        
        UIView *colLine = [[UIView alloc]init];
        [_parameContentView addSubview:colLine];
        colLine.backgroundColor = [UIColor groupTableViewBackgroundColor];
        [colLine mas_makeConstraints:^(MASConstraintMaker *make) {
            
            make.size.mas_equalTo(CGSizeMake(1, kParameViewH));
            make.left.equalTo(self.contentView).offset(width);
            make.top.equalTo(_separatorLine.mas_bottom).offset(kParameViewH*row);
            
        }];
        
    }];
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    _topView.frame = CGRectMake(0, 0, self.contentView.width, kTopViewH);
    
    _closeButton.frame = CGRectMake(self.contentView.width-18-15, 8, 18, 18);
    
    self.titleLabel.frame = CGRectMake(10, 8, CGRectGetMinX(_closeButton.frame), 20);
    
    _normasTtileLabel.frame = CGRectMake(CGRectGetMinX(self.titleLabel.frame), CGRectGetMaxY(self.titleLabel.frame)+5, 43, 17);
    
    _normsLabel.frame = CGRectMake(CGRectGetMaxX(_normasTtileLabel.frame)+5, _normasTtileLabel.y, self.contentView.width/2, 17);
    
    _separatorLine.frame = CGRectMake(0, CGRectGetMaxY(_normsLabel.frame)+5, self.contentView.width, 1);
    
    [_parameContentView mas_makeConstraints:^(MASConstraintMaker *make) {
       
        make.top.equalTo(_separatorLine.mas_bottom);
        make.left.right.bottom.equalTo(self.contentView);
        
    }];
    
}

//计算cell高度
-(CGFloat)cellHeight
{
    NSInteger kColumn = 2;
    NSInteger rowCount = (self.parameViewArray.count+kColumn-1)/kColumn;
    return kTopViewH+rowCount*kParameViewH+5;
}

#pragma mark - 数据加载

- (void)setupDrugCellByDrug:(EDrug *)drug{
    
    if (drug.isNewDrug) {
        drug.everyCount = @"1";
        drug.allCount = @"1";
    }
    
    self.titleLabel.text = drug.universalName;
    self.normsLabel.text = drug.norms;
    [_amountView.amountButton setTitle:drug.allUnit forState:UIControlStateNormal];
    if (!isEmptyString(drug.everyCount) ) {
        _dosageView.doageTextfield.text = drug.everyCount;
    }
    if (!isEmptyString(drug.frequency) ) {
        [_rateView.rateButton setTitle:drug.frequency forState:UIControlStateNormal];
    }
    if (!isEmptyString(drug.everyUnit) ) {
        [_dosageView.doageButton setTitle:drug.everyUnit forState:UIControlStateNormal];
    }
    if (!isEmptyString(drug.usage) ) {
        [_useageView.usageButton setTitle:drug.usage forState:UIControlStateNormal];
    }
    
    if (!drug.isNewDrug) {
        
        if (!isEmptyString(drug.allCount) ) {
            _amountView.amountTextfield.text = drug.allCount;
        }
        
    }
    
    
}


#pragma mark - buttonAction
- (void)closeButtonAction
{
    
}

- (void)showActionSheetWithTag:(NSInteger)tag Titles:(NSArray *)titles
{
    UIActionSheet *actionSheet = [[UIActionSheet alloc]initWithTitle:nil delegate:self cancelButtonTitle:@"取消" destructiveButtonTitle:nil otherButtonTitles:nil, nil];
    
    for (NSString *title in titles) {
        
        [actionSheet addButtonWithTitle:title];
        
    }
    actionSheet.delegate = self;
    actionSheet.tag = tag;
    [actionSheet showInView:self.superview];
}

- (void)creatAlertViewWithTitle: (NSString *)title{
    
    UIAlertView *alert = [[UIAlertView alloc]initWithTitle:title message:nil delegate:self cancelButtonTitle:@"取消" otherButtonTitles:@"确定", nil];
    alert.delegate = self;
    alert.alertViewStyle = UIAlertViewStylePlainTextInput;
    [[alert textFieldAtIndex:0] setKeyboardType:UIKeyboardTypeDefault];
    
    [alert show];
    
}
#pragma mark - UIAlertView Delegate

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex{
    [[NSUserDefaults standardUserDefaults]setBool:YES forKey:@"kIsChangeData"];
    
    NSString *text = [alertView textFieldAtIndex:0].text;
    
    if (buttonIndex == 0) {
        
        return;
    }
    
    if (![self countJudgeByText:text]) {
        
        return;
    }
    
    if (buttonIndex == 1) {
        
        if ([alertView.title isEqualToString:@"用法"]) {
            
            [_useageView.usageButton setTitle:text forState:UIControlStateNormal];
            NSDictionary *dict = @{@"msgName":@"usage",@"msg":text};
            [self postChangeMsgNotiWithDict:dict];

        }else if ([alertView.title isEqualToString:@"请输入频次(次/天)"]){
            
            [_rateView.rateButton setTitle:text forState:UIControlStateNormal];
            NSDictionary *dict = @{@"msgName":@"frequency",@"msg":text};
            [self postChangeMsgNotiWithDict:dict];
            return;

        }
        
    }
    
    [alertView removeFromSuperview];
}


#pragma mark - UIActionSheet Delegate

- (void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex{
    
    [[NSUserDefaults standardUserDefaults]setBool:YES forKey:@"kIsChangeData"];
    
    NSString *currentTitle = [actionSheet buttonTitleAtIndex:buttonIndex];
    
    if ([currentTitle isEqualToString:@"取消"]) {
        
        return;
        
    }
    
    if (actionSheet.tag == 100) {
        
        if ([currentTitle isEqualToString:@"其他"]) {
            
            [self creatAlertViewWithTitle:@"用法"];
            
        }else{
            
            [_useageView.usageButton setTitle:currentTitle forState:UIControlStateNormal];
            NSDictionary *dict = @{@"msgName":@"usage",@"msg":USAGEARR[buttonIndex]};
            [self postChangeMsgNotiWithDict:dict];
        }

    }else if (actionSheet.tag ==101){
        
        [_dosageView.doageButton setTitle:currentTitle forState:UIControlStateNormal];
        NSDictionary *dict = @{@"msgName":@"everyUnit",@"msg":currentTitle};
        [self postChangeMsgNotiWithDict:dict];
        
    }else if (actionSheet.tag == 102){
        
        if ([currentTitle isEqualToString:@"其他"]) {
            [self creatAlertViewWithTitle:@"请输入频次(次/天)"];
            return;
        }else if (buttonIndex < FREQUENCYARR.count){
            
            [_rateView.rateButton setTitle:currentTitle forState:UIControlStateNormal];
            NSDictionary *dict = @{@"msgName":@"frequency",@"msg":FREQUENCYARR[buttonIndex]};
            [self postChangeMsgNotiWithDict:dict];
        }

    }


}


- (void)actionSheetCancel:(UIActionSheet *)actionSheet{
    [actionSheet removeFromSuperview];
}



#pragma mark - EDrugParameView Delegate


- (void)didClickUsageButton:(UIButton *)sender
{
    [self showActionSheetWithTag:100 Titles:USAGEARR];
    
}

- (void)didClickDosageButton:(UIButton *)sender
{
    [self showActionSheetWithTag:101 Titles:DOSAGEARR];
    
}

- (void)didClickRateButton:(UIButton *)sender
{
    
    [self showActionSheetWithTag:102 Titles:FREQUENCYARR];
    
}

- (void)didChangeDosageTextField:(UITextField *)textField
{
    NSLog(@"DosageTextField = %@",textField.text);
    
    BOOL isCorrect = [self judgeTextFieldTextWithText:textField.text];
    if (isCorrect) {
        
        NSMutableDictionary *dict = [NSMutableDictionary dictionary];
        NSString *text = textField.text;
        textField.text = [text getCorrectTrailByTrailCount:2];
        [dict setObject:textField.text forKey:@"msg"];
        [dict setObject:@"everyCount" forKey:@"msgName"];
        [self postChangeMsgNotiWithDict:dict];
        [textField resignFirstResponder];

    }else{
        
        textField.text = @"";

    }
    
}

- (void)didChangeAmountTextField:(UITextField *)textField
{
    BOOL isCorrect = [self judgeTextFieldTextWithText:textField.text];
    if (isCorrect) {
        
        NSLog(@"AmountTextField = %@",textField.text);
        NSMutableDictionary *dict = [NSMutableDictionary dictionary];
        [dict setObject:textField.text forKey:@"msg"];
        [dict setObject:@"allCount" forKey:@"msgName"];
        [self postChangeMsgNotiWithDict:dict];
        [textField resignFirstResponder];
        
    }else{
        
        textField.text = @"";
    }
}

#pragma mark - 数据封装
- (void)postChangeMsgNotiWithDict:(NSDictionary *)dict{
    
    NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithDictionary:dict];
    [dic setObject:self.titleLabel.text forKey:@"drugName"];
    NSNotification *msgnoti = [[NSNotification alloc]initWithName:@"MSGCHANGE" object:dic userInfo:nil];
    [[NSNotificationCenter defaultCenter]postNotification:msgnoti];
}

//判断填的数据是否为空或超出字数长度
- (BOOL)countJudgeByText:(NSString *)text{
    
    if (isEmptyString(text)) {
        
        kShowHUDToastInView(self.superview, @"不能为空");
        
        return NO;
    }
    
    if (text.length>8) {
        
        kShowHUDToastInView(self.superview, @"长度不能超过8位");
        
        return NO;
    }
    
    return YES;
    
}

//判断所填数值是否超出范围
- (BOOL)judgeTextFieldTextWithText:(NSString *)text
{
    if (isEmptyString(text)) {
        [HRProgressHUD showErrorHUD:self message:@"数值不能为空"];
        return NO;
    }
    CGFloat count = [text floatValue];
    if (count == 0) {
        [HRProgressHUD showErrorHUD:self message:@"数值不能为零"];
        return NO;
    }
    if (count >= 100) {
        [HRProgressHUD showErrorHUD:self message:@"数值不能超过一百"];
        
        return NO;
    }

    return YES;
}


@end
