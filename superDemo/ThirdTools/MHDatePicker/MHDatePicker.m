//
//  MHDatePicker.m
//  MHDatePicker
//
//  Created by LMH on 16/03/12.
//  Copyright (c) 2015年 LMH. All rights reserved.
//

#import "MHDatePicker.h"
#define kWinH [[UIScreen mainScreen] bounds].size.height
#define kWinW [[UIScreen mainScreen] bounds].size.width

// pickerView高度
#define kPVH (kWinH*0.35>230?230:(kWinH*0.35<200?200:kWinH*0.35))

@interface MHDatePicker()
@property (strong, nonatomic) UIButton *bgButton;
@property (strong, nonatomic) MHSelectPickerView *pickerView;
@property (strong, nonatomic) DataTimeSelect selectBlock;
@end

@implementation MHDatePicker

+ (instancetype)shareInstance
{
    __block MHDatePicker *picker = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        picker = [[MHDatePicker alloc]init];
        
    });
    
    return picker;
}

- (instancetype)init
{
    if (self = [super initWithFrame:[[UIScreen mainScreen] bounds]]) {

        [[[UIApplication sharedApplication] keyWindow] addSubview:self];
        //半透明背景按钮
        _bgButton = [[UIButton alloc] init];
        [self addSubview:_bgButton];
        [_bgButton addTarget:self action:@selector(dismissDatePicker) forControlEvents:UIControlEventTouchUpInside];
        _bgButton.backgroundColor = [UIColor blackColor];
        _bgButton.alpha = 0.0;
        _bgButton.frame = CGRectMake(0, 0, kWinW, kWinH);
        
        //时间选择View
        _pickerView = [[NSBundle mainBundle] loadNibNamed:NSStringFromClass([MHSelectPickerView class]) owner:self options:nil].lastObject;
        [self addSubview:_pickerView];
        _pickerView.frame = CGRectMake(0, kWinH, kWinW, kPVH);
        [_pickerView.cancleBtn addTarget:self action:@selector(dismissDatePicker) forControlEvents:UIControlEventTouchUpInside];
        [_pickerView.confirmBtn addTarget:self action:@selector(confirmBtnClick:) forControlEvents:UIControlEventTouchUpInside];
        [_pickerView.datePicker addTarget:self action:@selector(datePickerValueChange:) forControlEvents:UIControlEventValueChanged];
        
        //DatePicker属性设置
// _selectDate = [[NSDate date] dateByAddingTimeInterval:60*60];
//        _selectDate = [NSDate new];
//
//        _pickerView.datePicker.date = _selectDate;
//        _pickerView.datePicker.minimumDate = _selectDate;
//
//        _pickerView.datePicker.datePickerMode = UIDatePickerModeDateAndTime;
        
        [self pushDatePicker];
    }
    return self;
}

- (void)setSelectDate:(NSDate *)selectDate
{
    _selectDate = selectDate;
    if (selectDate) {
        _pickerView.datePicker.date = selectDate;
    }
}

- (void)setDatePickerMode:(UIDatePickerMode)datePickerMode
{
    _pickerView.datePicker.datePickerMode = datePickerMode;
}

- (void)setIsBeforeTime:(BOOL)isBeforeTime
{
    if (isBeforeTime) {
        [_pickerView.datePicker setMinimumDate:[NSDate dateWithTimeIntervalSince1970:0]];
    }
    else {
        [_pickerView.datePicker setMinimumDate:[NSDate date]];
    }
}

- (void)setMinSelectDate:(NSDate *)minSelectDate
{
    if (minSelectDate) {
        [_pickerView.datePicker setMinimumDate:minSelectDate];
    }
}

- (void)setMaxSelectDate:(NSDate *)maxSelectDate
{
    if (maxSelectDate) {
        [_pickerView.datePicker setMaximumDate:maxSelectDate];
    }
}

- (void)didFinishSelectedDate:(DataTimeSelect)selectDataTime
{
    _selectBlock = selectDataTime;
}

//DatePicker值改变
- (void)datePickerValueChange:(id)sender
{
    _selectDate = [sender date];
}

//确定
- (void)confirmBtnClick:(id)sender
{
    if (_selectBlock) {
        _selectBlock(_selectDate);
    }
    [self dismissDatePicker];
}

//出现
- (void)pushDatePicker
{
    __weak typeof(self) weakSelf = self;
    [UIView animateWithDuration:0.15 animations:^{
        weakSelf.pickerView.frame = CGRectMake(0, kWinH - kPVH, kWinW, kPVH);
        weakSelf.bgButton.alpha = 0.2;
    }];
}

//消失
- (void)dismissDatePicker
{
    __weak typeof(self) weakSelf = self;
    [UIView animateWithDuration:0.2 animations:^{
        weakSelf.pickerView.frame = CGRectMake(0, kWinH, kWinW, kPVH);
        weakSelf.bgButton.alpha = 0.0;
    } completion:^(BOOL finished) {
        [weakSelf.pickerView removeFromSuperview];
        [weakSelf.bgButton removeFromSuperview];
        [weakSelf removeFromSuperview];
    }];
}


- (NSString *)dateStringWithDate:(NSDate *)date DateFormat:(NSString *)dateFormat
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:dateFormat];
    [dateFormatter setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"zh_CN"]];
    NSString *str = [dateFormatter stringFromDate:date];
    return str ? str : @"";
}

@end
