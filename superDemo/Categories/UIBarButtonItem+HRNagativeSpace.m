//
//  UIBarButtonItem+HRNagativeSpace.m
//  SmartCommunity
//
//  Created by Harvey Huang on 15/6/4.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import "UIBarButtonItem+HRNagativeSpace.h"

static CGFloat const kTextFontOfSzie = 15.0f;

@implementation UIBarButtonItem (HRNagativeSpace)

+ (UIBarButtonItem *)navigationSpacer{
    UIBarButtonItem *navigationSpacer = [[UIBarButtonItem alloc]
                                         initWithBarButtonSystemItem:UIBarButtonSystemItemFixedSpace
                                         target:nil action:nil];
    if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_6_1) {
        navigationSpacer.width = - 10;  // ios 7
    }else{
        navigationSpacer.width = - 6;  // ios 6
    }
    return navigationSpacer;
}

+ (UIBarButtonItem *)setBackItemTitle:(NSString *)title
                               target:(id)target
                               action:(SEL)action
{
    NSMutableParagraphStyle *paragraphStyle = [[NSMutableParagraphStyle alloc]init];
    paragraphStyle.lineBreakMode = NSLineBreakByWordWrapping;
    
    NSDictionary *attribute = @{NSFontAttributeName:[UIFont systemFontOfSize:kTextFontOfSzie],
                                NSParagraphStyleAttributeName:paragraphStyle.copy};
    
    
    CGRect aRect = [title boundingRectWithSize:CGSizeMake(100, 0)
                                       options:NSStringDrawingTruncatesLastVisibleLine | NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading
                                    attributes:attribute context:nil];
    
    UIButton *backBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    
    backBtn.frame = CGRectMake(0, 0, 20 + aRect.size.width, 30);
    
    [backBtn setImage:[UIImage imageNamed:@"leftNavBarItem_back"] forState:UIControlStateNormal];
    
    [backBtn setTitle:[NSString stringWithFormat:@" %@",title]
             forState:UIControlStateNormal];
    
    [backBtn setTitleColor:[UIColor whiteColor]
                  forState:UIControlStateNormal];
    
    [backBtn setTitleColor:[UIColor grayColor]
                  forState:UIControlStateHighlighted];
    
    backBtn.titleLabel.font = [UIFont systemFontOfSize:kTextFontOfSzie];
    
    backBtn.backgroundColor = [UIColor clearColor];
    
    [backBtn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    
    UIBarButtonItem *backBarItem = [[UIBarButtonItem alloc]initWithCustomView:backBtn];
    
    return backBarItem;
}

+ (UIBarButtonItem *)itemWithTarget:(id)target action:(SEL)action image:(NSString *)image
{
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    [btn addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    
    // 设置图片
    [btn setImage:[UIImage imageNamed:image] forState:UIControlStateNormal];
    // 设置尺寸
    btn.size = btn.currentImage.size;
    return [[UIBarButtonItem alloc] initWithCustomView:btn];
}



+ (UIBarButtonItem *)barButtonItemWithImage:(UIImage *)image highImage:(UIImage *)highImage target:(id)target action:(SEL)action forControlEvents:(UIControlEvents)controlEvents
{
    // btn
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    [btn setBackgroundImage:image forState:UIControlStateNormal];
    [btn setBackgroundImage:highImage forState:UIControlStateHighlighted];
    [btn sizeToFit];
    
    [btn addTarget:target action:action forControlEvents:controlEvents];
    
    return  [[UIBarButtonItem alloc] initWithCustomView:btn];
}


+(UIBarButtonItem *)barButtonItemWithImage:(UIImage *)image title:(NSString *)title target:(id)target action:(SEL)action forControlEvents:(UIControlEvents)controlEvents{
    
    // btn
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    //    [btn setBackgroundImage:image forState:UIControlStateNormal];
    [btn setImage:image forState:UIControlStateNormal];
    [btn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [btn setTitle:title forState:UIControlStateNormal];
    [btn sizeToFit];
    
    [btn addTarget:target action:action forControlEvents:controlEvents];
    
    return  [[UIBarButtonItem alloc] initWithCustomView:btn];
}

@end
