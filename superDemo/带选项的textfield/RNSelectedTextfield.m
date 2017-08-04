//
//  RNSelectedTextfield.m
//  SuperDemo
//
//  Created by Rany on 2017/7/7.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "RNSelectedTextfield.h"
#import "RNInputHistoryListView.h"


@interface RNSelectedTextfield()<UITextFieldDelegate,RNInputHistoryListViewDelegate>


/**
 右边的选择按钮
 */
@property(nonatomic, strong) UIButton *rightSelectButton;

@property(nonatomic, strong) RNInputHistoryListView *listView;

@end

@implementation RNSelectedTextfield

#pragma mark - init Method

- (instancetype)init
{
    self = [super init];
    if (self) {
        
        [self setupUI];
    }
    return self;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.frame = frame;
        [self setupUI];
    }
    return self;
}


-(RNInputHistoryListView *)listView
{
    if (!_listView) {
        
        _listView = [[RNInputHistoryListView alloc]init];
        _listView.delegate = self;
    }
    
    return _listView;
}

#pragma mark - UI
- (void)setupUI
{
    
    self.userInteractionEnabled = YES;
    
    //init textField
    self.textField = [[UITextField alloc]init];
    self.textField.delegate = self;
    self.textField.returnKeyType = UIReturnKeyDone;
    [self addSubview:self.textField];
    //init Button
    UIButton *rightSelectButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [rightSelectButton setImage:[UIImage imageNamed:@"down"] forState:UIControlStateNormal];
    rightSelectButton.backgroundColor = [UIColor groupTableViewBackgroundColor];
    [rightSelectButton addTarget:self action:@selector(rightSelectButtonAction) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:rightSelectButton];
    self.rightSelectButton = rightSelectButton;
    
    //defaule limit
//    self.cacheInputTextLimit = 6;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    
    //textField Frame
    self.textField.frame = CGRectMake(10, 0, self.frame.size.width-self.frame.size.height-10, self.bounds.size.height);
    
    //rightSelectButton frame
    self.rightSelectButton.frame = CGRectMake(CGRectGetMaxX(self.textField.frame), 0, self.frame.size.height, self.frame.size.height);
    
    
    //view Border
    self.layer.borderColor = [UIColor grayColor].CGColor;
    self.layer.borderWidth = 1.0f;
    
}

#pragma mark - Public Method

- (void)saveInputCache
{
    
    //判断userdefault中是否有缓存记录
    NSArray *historyArray = [[NSUserDefaults standardUserDefaults]objectForKey:kInputHistoryList];
    
    //去除掉首尾的空白字符和换行字符
    NSString *currentInputText = [self.textField.text stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];

    if (currentInputText.length == 0) {
        
        return;
    }
    
    if (historyArray.count>0) {
        
        
        if (historyArray.count>=self.cacheInputTextLimit) {
            //超过保存数量
            return;
        }
        
        NSMutableArray *tmpMutArray = [NSMutableArray arrayWithArray:historyArray];
        
        //判断数组是否包含这个元素
        
        if ([historyArray containsObject:currentInputText]) {
            
            return;
            
        }
        
        [tmpMutArray addObject:currentInputText];
        
        [[NSUserDefaults standardUserDefaults]setObject:tmpMutArray forKey:kInputHistoryList];
        
    }else{
        
        NSMutableArray *newMutArray = [NSMutableArray arrayWithObject:currentInputText];
        
        [[NSUserDefaults standardUserDefaults]setObject:newMutArray forKey:kInputHistoryList];
        
    }
    
    [[NSUserDefaults standardUserDefaults]synchronize];

}

- (void)hideHistoryList
{
    if (self.rightSelectButton.isSelected) {
        
        [self.listView removeFromSuperview];

        self.rightSelectButton.selected = !self.rightSelectButton.isEnabled;
    }
    
    return;
}

#pragma mark - rightSelectButton Action
- (void)rightSelectButtonAction
{
    
     NSArray *historyArray = [[NSUserDefaults standardUserDefaults]objectForKey:kInputHistoryList];
    
    if (historyArray.count == 0) {
        return;
    }
    
    if (self.rightSelectButton.isSelected) {
        
        [self.listView removeFromSuperview];
        
    }else{
        
       
        
        self.listView.frame = CGRectMake(self.frame.origin.x, CGRectGetMaxY(self.frame), self.textField.frame.size.width+10, historyArray.count*35);
        
        self.listView.inputArray = historyArray;
        
        [self.window addSubview:self.listView];
        
    }
    
    
    
    self.rightSelectButton.selected = !self.rightSelectButton.isSelected;
    
}

#pragma mark - textField Delegate

- (void)textFieldDidEndEditing:(UITextField *)textField
{
    if (self.autoSaveCache) {
        
        [self saveInputCache];

    }
    
    return;
}

#pragma mark - RNInputHistoryListViewDelegate

-(void)didSelectAtIndex:(NSInteger)index Object:(NSString *)selectObject
{
    self.textField.text = selectObject;
    
    [self hideHistoryList];
}


@end
