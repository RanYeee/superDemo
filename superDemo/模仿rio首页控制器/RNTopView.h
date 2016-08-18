//
//  RNTopView.h
//  SuperDemo
//
//  Created by Rany on 16/8/9.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "MDTabBar.h"

@interface RNTopView : UIView

@property (nonatomic ,strong) UIImage *iconImage;

@property (nonatomic ,copy) NSArray *items;

@property (nonatomic,strong) MDTabBar *mdTabbar;


- (void)reloadWithScrollView:(UIScrollView *)scrollView;

@end
