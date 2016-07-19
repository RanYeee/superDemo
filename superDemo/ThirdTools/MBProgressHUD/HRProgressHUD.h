//
//  HRProgressHUD.h
//  SmartCommunity
//
//  Created by Harvey Huang on 15/6/9.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import "MBProgressHUD.h"

@interface HRProgressHUD : MBProgressHUD

+ (instancetype)showHUDInView:(UIView *)parentView;

+ (instancetype)showHUDInView:(UIView *)parentView onlyMessage:(NSString *)message;

+ (instancetype)showSuccessHUD:(UIView *)parentView message:(NSString *)message;

+ (instancetype)showErrorHUD:(UIView *)parentView message:(NSString *)message;

@end
