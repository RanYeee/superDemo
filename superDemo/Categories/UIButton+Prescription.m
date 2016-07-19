//
//  UIButton+Prescription.m
//  ElectronicPrescribing
//
//  Created by IMac on 16/4/26.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "UIButton+Prescription.h"

@implementation UIButton (Prescription)

+(instancetype)buttonWithImage:(NSString *)ImageString title:(NSString *)title color:(NSString *)colorString target:(id)target action:(SEL)action

{
    UIButton * button = [UIButton buttonWithType:UIButtonTypeCustom];
    button.backgroundColor = [UIColor whiteColor];
    button.titleLabel.font = [UIFont systemFontOfSize:16];
    [button setImage:[UIImage imageNamed:ImageString] forState:UIControlStateNormal];
    [button setTitle:title forState:UIControlStateNormal];
    [button setTitleColor:[UIColor colorWithHexString:colorString] forState:UIControlStateNormal];
    [button addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    
    return button;
}

+(instancetype)buttonWithTitle:(NSString *)title color:(NSString *)colorString selectColor:(NSString *)selectColor target:(id)target action:(SEL)action

{
    UIButton * button = [UIButton buttonWithType:UIButtonTypeCustom];
    button.backgroundColor = [UIColor whiteColor];
    button.titleLabel.font = [UIFont systemFontOfSize:16];
    [button setTitle:title forState:UIControlStateNormal];
    [button setTitleColor:[UIColor colorWithHexString:colorString] forState:UIControlStateNormal];
    [button setTitleColor:[UIColor colorWithHexString:selectColor] forState:UIControlStateDisabled];
    [button addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    
    return button;
}


@end
