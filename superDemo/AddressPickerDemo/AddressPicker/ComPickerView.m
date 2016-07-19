//
//  ComPickerView.m
//  ElectronicPrescribing
//
//  Created by Ducky on 16/5/3.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "ComPickerView.h"
#import "ProvinceEntity.h"
#import "CityEntity.h"
#import "AreaEntity.h"
#import "AreaDataBaseOpreation.h"

#define DB_NAME  @"smartmedical.db"

@interface ComPickerView(){
    
    onClickButtonAtcion _btnBlock;
    
}

@property (nonatomic, strong) UIView *mainView;

@property (weak, nonatomic) IBOutlet UIButton *closeBtn;

@property (weak, nonatomic) IBOutlet UIButton *confirmBtn;

@property (nonatomic,strong) NSString * pickerResult;//选中内容

@property (nonatomic,strong) NSString * resultType;//内容类型，默认为 ‘0’；其他自定义

@property (nonatomic,strong) AreaDataBaseOpreation * dbOpreation;

@property (nonatomic,strong) NSMutableArray * pickerDatas;

@end

@implementation ComPickerView

-(instancetype)initWithClickDateButton:(onClickButtonAtcion)btnBlock withDelagateSource : (id <CompickerDataSource>) dataSource{

    self = [super init];
    
    if (self) {
        
        self = [[[NSBundle mainBundle] loadNibNamed:@"ComPickerView" owner:self options:nil] lastObject];
        _btnBlock = btnBlock;
        // 初始化设置
        self.resultType = @"0";
        
        self.datas = [[NSMutableArray alloc] init];
        
        UIWindow *window = [UIApplication sharedApplication].keyWindow;
        
        self.frame = CGRectMake(0, SCREEN_HEIGHT, SCREEN_WIDTH, 270);
        
        [window addSubview:self.mainView];
        
        [window addSubview:self];
        
        self.mPickerView.delegate = self;
        
        self.mPickerView.dataSource = self;
        
        self.dataSource = dataSource;
        
        self.datas = [self.dataSource loadData];
        
    }
    return self;
    
}


- (UIView *)mainView {
    if (_mainView == nil) {
        _mainView = [[UIView alloc] initWithFrame:[UIScreen mainScreen].bounds];
        _mainView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.3];
        _mainView.hidden = YES;
        
        UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(hide)];
        [_mainView addGestureRecognizer:tap];
    }
    return _mainView;
}


-(void)show{
    [UIView animateWithDuration:0.35 delay:0 usingSpringWithDamping:0.7 initialSpringVelocity:0.8 options:UIViewAnimationOptionCurveEaseInOut animations:^{
        self.mainView.hidden = NO;
        
        CGRect newFrame = self.frame;
        newFrame.origin.y = SCREEN_HEIGHT - self.frame.size.height;
        self.frame = newFrame;
    } completion:nil];
    
}

- (void)hide {
    [UIView animateWithDuration:0.35 delay:0 usingSpringWithDamping:0.7 initialSpringVelocity:0.5 options:0 animations:^{
        self.mainView.hidden = YES;
        
        CGRect newFrame = self.frame;
        newFrame.origin.y = SCREEN_HEIGHT;
        self.frame = newFrame;
    } completion:nil];
}

-(void)readLoadDatas:(NSMutableArray *) datas;{

    self.datas = datas;
    
    [self.mPickerView reloadAllComponents];
    
    [self.mPickerView selectRow:0 inComponent:0 animated:NO];

}

/*** delegate statr ***/
-(NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component{
 
    NSObject * obj = [self.datas objectAtIndex:row];
    
    if([obj isKindOfClass:[ProvinceEntity class]]){
    
        return ((ProvinceEntity *)[self.datas objectAtIndex:row]).province;
        
    }else if([obj isKindOfClass:[CityEntity class]]){
        
        return ((CityEntity *)[self.datas objectAtIndex:row]).city;
        
    }else if([obj isKindOfClass:[AreaEntity class]]){
        
        return ((AreaEntity *)[self.datas objectAtIndex:row]).area;
        
    }else{
    
        return [self.datas objectAtIndex:row];
    }

    
}

-(NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component{
    
    return [self.datas count];
    
}

-(NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView{
    return 1;
}

//选中
-(void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component{

}

/*** delegate end ***/

/*** onlick start ***/

- (IBAction)closeOnclickAction:(id)sender {
    [self hide];
}

- (IBAction)confirmOnclickAction:(id)sender {
    
    [self hide];
    
    NSInteger row = [self.mPickerView selectedRowInComponent:0];

    if([[self.datas objectAtIndex:row] isKindOfClass:[ProvinceEntity class]]){
        
        self.resultType = @"province";
        
    }else if([[self.datas objectAtIndex:row] isKindOfClass:[CityEntity class]]){
        
        self.resultType = @"city";
        
    }else if([[self.datas objectAtIndex:row] isKindOfClass:[AreaEntity class]]){
        
        self.resultType = @"area";
        
    }else{
        self.resultType = @"0";
        
        self.pickerResult = [self.datas objectAtIndex:row];
    }
    
    self.pickerResult = [self.datas objectAtIndex:row];
    
    
    [self onClickButtonAtcion:self.resultType andResult:self.pickerResult];
}

-(void)onClickButtonAtcion:(NSString * )type andResult:(NSObject*) result{
    if(_btnBlock){
        _btnBlock(type,result);
    }
}

@end
