//
//  EDrugParameView.h
//  SuperDemo
//
//  Created by Rany on 2017/6/23.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol  EDrugParameViewDelegate<NSObject>

//按钮点击代理
- (void)didClickUsageButton:(UIButton *)sender;

- (void)didClickRateButton:(UIButton *)sender;

- (void)didClickDosageButton:(UIButton *)sender;

//textfield 代理
- (void)didChangeDosageTextField:(UITextField *)textField;

- (void)didChangeAmountTextField:(UITextField *)textField;

@end

//视图类型
typedef enum : NSUInteger {
    ParameViewTypeUsage, //用法
    ParameViewTypeRate, //频次
    ParameViewTypeDosage, //用量
    ParameViewTypeAmount //数量
} DrugParameViewType;



@interface EDrugParameView : UIView


+ (instancetype)createDrugParameViewWithViewType:(DrugParameViewType)type;

@property(nonatomic, weak) id<EDrugParameViewDelegate> delegate;
@property (weak, nonatomic) IBOutlet UITextField *doageTextfield;
@property (weak, nonatomic) IBOutlet UITextField *amountTextfield;

@property (weak, nonatomic) IBOutlet UIButton *usageButton;
@property (weak, nonatomic) IBOutlet UIButton *rateButton;
@property (weak, nonatomic) IBOutlet UIButton *doageButton;

@property (weak, nonatomic) IBOutlet UIButton *amountButton;

@end
