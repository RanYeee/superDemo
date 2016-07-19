//
//  UIButton+Prescription.h
//  ElectronicPrescribing
//
//  Created by IMac on 16/4/26.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIButton (Prescription)

+(instancetype)buttonWithImage:(NSString *)ImageString title:(NSString *)title color:(NSString *)colorString target:(id)target action:(SEL)action;

+(instancetype)buttonWithTitle:(NSString *)title color:(NSString *)colorString selectColor:(NSString *)selectColor target:(id)target action:(SEL)action;
@end
