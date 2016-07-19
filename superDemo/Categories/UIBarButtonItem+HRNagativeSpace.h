//
//  UIBarButtonItem+HRNagativeSpace.h
//  SmartCommunity
//
//  Created by Harvey Huang on 15/6/4.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIBarButtonItem (HRNagativeSpace)

+ (UIBarButtonItem *)navigationSpacer;

+ (UIBarButtonItem *)setBackItemTitle:(NSString*)title target:(id)target action:(SEL)action;

+ (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action image:(NSString *)image;

/**
 *  返回样式:图片
 *
 *  @param image         <#image description#>
 *  @param highImage     <#highImage description#>
 *  @param target        <#target description#>
 *  @param action        <#action description#>
 *  @param controlEvents <#controlEvents description#>
 *
 *  @return <#return value description#>
 */


+ (UIBarButtonItem *)barButtonItemWithImage:(UIImage *)image highImage:(UIImage *)highImage target:(id)target action:(SEL)action forControlEvents:(UIControlEvents)controlEvents;
/**
 *  返回样式:图片+文字
 *
 *  @param image         <#image description#>
 *  @param title         <#title description#>
 *  @param target        <#target description#>
 *  @param action        <#action description#>
 *  @param controlEvents <#controlEvents description#>
 *
 *  @return <#return value description#>
 */
+(UIBarButtonItem *)barButtonItemWithImage:(UIImage *)image title:(NSString *)title target:(id)target action:(SEL)action forControlEvents:(UIControlEvents)controlEvents;
@end
