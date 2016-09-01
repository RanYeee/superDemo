//
//  LeftMemuViewController.h
//  SuperDemo
//
//  Created by Rany on 16/8/29.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface LeftMemuViewController : UIViewController

- (void)hideOrShowMenu:(BOOL)isShow animated:(BOOL)isAnimated;

@property (nonatomic ,assign) BOOL isShow;


@end
