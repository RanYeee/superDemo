//
//  UIView+SimpleAnimation.h
//  ElectronicPrescribing
//
//  Created by Rany on 16/4/26.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef void(^ShakeComplete)();

@interface UIView (SimpleAnimation)

+(void)shakeView:(UIView*)viewToShake Complete:(void (^)(void))complete;



@end
