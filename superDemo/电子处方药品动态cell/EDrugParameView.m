//
//  EDrugParameView.m
//  SuperDemo
//
//  Created by Rany on 2017/6/23.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "EDrugParameView.h"

@interface EDrugParameView()

@end

@implementation EDrugParameView

- (void)awakeFromNib
{
    [super awakeFromNib];
    
}

+(instancetype)createDrugParameViewWithViewType:(DrugParameViewType)type
{
    if (type == ParameViewTypeUsage) {
        
        return [[NSBundle mainBundle]loadNibNamed:NSStringFromClass(self) owner:nil options:nil][0];
        
    }else if (type == ParameViewTypeRate){
        
        return [[NSBundle mainBundle]loadNibNamed:NSStringFromClass(self) owner:nil options:nil][1];
        
    }else if (type == ParameViewTypeDosage){
        
        return [[NSBundle mainBundle]loadNibNamed:NSStringFromClass(self) owner:nil options:nil][2];
        
    }else if (type == ParameViewTypeAmount){
        
        return [[NSBundle mainBundle]loadNibNamed:NSStringFromClass(self) owner:nil options:nil][3];
        
    }else{
        
        return nil;
    }
}
- (IBAction)usageAction:(UIButton *)sender {
    
    NSLog(@"usageAction");
    if (self.delegate) {
        
        [self.delegate didClickUsageButton:sender];
    }
    
}
- (IBAction)rateAction:(UIButton *)sender {
    
    NSLog(@"rateAction");
    if (self.delegate) {
        
        [self.delegate didClickRateButton:sender];
    }
}
- (IBAction)dosageAction:(UIButton *)sender {
    
    NSLog(@"doageAction");
    if (self.delegate) {
        
        [self.delegate didClickDosageButton:sender];
    }
}
- (IBAction)doageTextFieldEditingDidEnd:(UITextField *)sender {
    
    if (self.delegate) {
        [self.delegate didChangeDosageTextField:sender];
    }
}
- (IBAction)amountTextFieldEditingDidEnd:(UITextField *)sender {
    
    if (self.delegate) {
        
        [self.delegate didChangeAmountTextField:sender];
    }
}

@end
