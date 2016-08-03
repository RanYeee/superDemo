//
//  FadeWordView.h
//  SuperDemo
//
//  Created by Rany on 16/8/3.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface FadeWordView : UIView

@property (nonatomic ,copy) NSString *text;

- (void)fadeToRightWithDuration:(NSTimeInterval)duration isAnimation:(BOOL)isAnimation;

@end
