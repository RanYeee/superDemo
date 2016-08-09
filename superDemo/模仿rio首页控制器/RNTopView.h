//
//  RNTopView.h
//  SuperDemo
//
//  Created by Rany on 16/8/9.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNTopView : UIView

@property (nonatomic ,strong) UIImage *iconImage;

@property (nonatomic ,copy) NSArray *items;

- (void)reloadWithScrollView:(UIScrollView *)scrollView;

@end
