//
//  UIView+SimpleAnimation.m
//  ElectronicPrescribing
//
//  Created by Rany on 16/4/26.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "UIView+SimpleAnimation.h"


@implementation UIView (SimpleAnimation)

+(void)shakeView:(UIView*)viewToShake Complete:(void (^)(void))complete
{
    CGFloat t =2.0;
    
    CGAffineTransform translateRight  =CGAffineTransformTranslate(CGAffineTransformIdentity, t,0.0);
    
    CGAffineTransform translateLeft =CGAffineTransformTranslate(CGAffineTransformIdentity,-t,0.0);
    
    viewToShake.transform = translateLeft;
    
    [UIView animateWithDuration:0.07 delay:0.3 options:UIViewAnimationOptionAutoreverse|UIViewAnimationOptionRepeat animations:^{
        
        [UIView setAnimationRepeatCount:2.0];
        
        viewToShake.transform = translateRight;
        
    } completion:^(BOOL finished){
        
        if(finished){
            
            
            [UIView animateWithDuration:0.05 delay:0.0 options:UIViewAnimationOptionBeginFromCurrentState animations:^{
                
                viewToShake.transform =CGAffineTransformIdentity;

            } completion:^(BOOL finished) {
               
                if (complete) {
                    
                    complete();
                    
                }
                
            }];
            
        }
        
    }];
    
}

@end
