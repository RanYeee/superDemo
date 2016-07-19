//
//  CALayer+Addition.m
//  SmartCommunity
//
//  Created by IMac on 15/9/25.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import <objc/runtime.h>
#import "CALayer+Addition.h"

@implementation CALayer (Addition)

- (UIColor *)borderColorFromUIColor {
    
    return objc_getAssociatedObject(self, @selector(borderColorFromUIColor));
}

- (void)setBorderColorFromUIColor:(UIColor *)color
{
    objc_setAssociatedObject(self, @selector(borderColorFromUIColor), color, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    
    [self setBorderColorFromUI: self.borderColorFromUIColor];
    
}

- (void)setBorderColorFromUI:(UIColor *)color
{
    self.borderColor = color.CGColor;
    
}

@end
