//
//  CALayer+Addition.h
//  SmartCommunity
//
//  Created by IMac on 15/9/25.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>


@interface CALayer (Addition)

@property(nonatomic, strong) UIColor *borderColorFromUIColor;

- (void)setBorderColorFromUIColor:(UIColor *)color;

@end
