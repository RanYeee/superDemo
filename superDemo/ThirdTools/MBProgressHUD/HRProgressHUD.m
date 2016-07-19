//
//  HRProgressHUD.m
//  SmartCommunity
//
//  Created by Harvey Huang on 15/6/9.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import "HRProgressHUD.h"


static NSTimeInterval const kAfterDelay = 1.5f;


@implementation HRProgressHUD


+ (instancetype)showHUDInView:(UIView *)parentView
{
    if (parentView == nil) {
        parentView = [UIApplication sharedApplication].keyWindow;
    }
    
    HRProgressHUD *hudView = [HRProgressHUD showHUDAddedTo:parentView animated:YES];
    
    hudView.alpha = 0.8f;
            
    [hudView hide:YES afterDelay:10];

    
    return hudView;
    
}

+ (instancetype)showHUDInView:(UIView *)parentView onlyMessage:(NSString *)message
{
    HRProgressHUD *hudView = [HRProgressHUD showHUDInView:parentView];
    
    hudView.mode = MBProgressHUDModeText;
    
    hudView.detailsLabelText = message;
    
    
    [hudView hide:YES afterDelay:kAfterDelay];
    
    return hudView;
}

+ (instancetype)showSuccessHUD:(UIView *)parentView message:(NSString *)message
{
    HRProgressHUD *successView = [HRProgressHUD showHUDInView:parentView];
    
    successView.labelText = message;
    
    successView.alpha = 0.9f;
    
    successView.animationType = MBProgressHUDAnimationZoomOut;
    
    successView.customView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"hud_success.png"]];
    
    successView.mode = MBProgressHUDModeCustomView;
    
    [successView hide:YES afterDelay:kAfterDelay];
    
    return successView;
}


+ (instancetype)showErrorHUD:(UIView *)parentView message:(NSString *)message
{
    HRProgressHUD *errorView = [HRProgressHUD showHUDInView:parentView];
    
    errorView.labelText = message;
    
    errorView.alpha = 0.9f;
    
    errorView.animationType = MBProgressHUDAnimationZoomOut;
    
    errorView.customView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"hud_error.png"]];
    
    errorView.mode = MBProgressHUDModeCustomView;
    
    [errorView hide:YES afterDelay:kAfterDelay];
    
    return errorView;
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
