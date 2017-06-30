//
//  NSString+intJudge.m
//  ElectronicPrescribing
//
//  Created by Ducky on 2016/11/17.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "NSString+intJudge.h"

@implementation NSString (intJudge)

- (NSInteger)judgeIntIndex{
    
    for (int i = 1; i < self.length + 1; i++) {
        NSString *testString = [self substringToIndex:i];
        if (![self isPureInt:testString]) {
            return i - 1;
        }
    }
    return -1;
}

- (BOOL)isPureInt:(NSString *)string{
    
    NSScanner* scan = [NSScanner scannerWithString:string];
    int val;
    return[scan scanInt:&val] && [scan isAtEnd];
}

- (BOOL)intStringCouldNotLargeThan:(NSInteger)count popErrorMsg:(BOOL)show{
    
    NSInteger temp = [self integerValue];
    if (count >= temp) {
        return YES;
    }
    if (show) {
        [HRProgressHUD showErrorHUD:[self getCurrentVC].view message:[NSString stringWithFormat:@"数量不能超过%ld",(long)count]];
    }
    return NO;
    
}

- (BOOL)intStringCouldNotLessThan:(NSInteger)count popErrorMsg:(BOOL)show{
    
    NSInteger temp = [self integerValue];
    if (temp >= count) {
        return YES;
    }
    if (show) {
        [HRProgressHUD showErrorHUD:[self getCurrentVC].view message:[NSString stringWithFormat:@"数量不能低于%ld",(long)count]];
    }
    return NO;

}

- (NSString *)getCorrectTrailByTrailCount:(NSInteger)count{
    
    if (count < 0) {
        return self;
    }
    
    CGFloat normalFloat = [self doubleValue] * pow(10, count);
    NSInteger normalInt = floorf(normalFloat);
    while (normalInt > [self doubleValue]) {
        
        if (normalInt % 10 == 0) {
            count --;
            normalInt /= 10;
            continue;
        }else{
            break;
        }
    }
    
    CGFloat resultFloat =  normalInt / pow(10, count) * 1.0;
    
    NSString * outNumber = [NSString stringWithFormat:@"%@",@(resultFloat)];
    
    return outNumber;
}

//小数最多显示尾数  超出时return NO
- (BOOL)doMostTrailCountJudge:(NSInteger)trailCount{
    
    NSString *tailStr = [[self componentsSeparatedByString:@"."]lastObject];
    if (tailStr.length <= trailCount) {
        return YES;
    }
    return NO;
}

#pragma mark - other Method
//获取当前屏幕显示的viewcontroller
- (UIViewController *)getCurrentVC
{
    UIViewController *result = nil;
    
    UIWindow * window = [[UIApplication sharedApplication] keyWindow];
    if (window.windowLevel != UIWindowLevelNormal)
    {
        NSArray *windows = [[UIApplication sharedApplication] windows];
        for(UIWindow * tmpWin in windows)
        {
            if (tmpWin.windowLevel == UIWindowLevelNormal)
            {
                window = tmpWin;
                break;
            }
        }
    }
    
    UIView *frontView = [[window subviews] objectAtIndex:0];
    id nextResponder = [frontView nextResponder];
    
    if ([nextResponder isKindOfClass:[UIViewController class]])
        result = nextResponder;
    else
        result = window.rootViewController;
    
    return result;
}

@end
