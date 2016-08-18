//
//  RNSlideViewController.h
//  SuperDemo
//
//  Created by Rany on 16/8/6.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
@class RNSlideViewController;

@protocol RNSlideViewControllerDelegate <NSObject>

- (UIViewController *)tabBarViewController:
(RNSlideViewController *)viewController
                     viewControllerAtIndex:(NSUInteger)index;

@optional
- (void)tabBarViewController:(RNSlideViewController *)viewController
              didMoveToIndex:(NSUInteger)index;
@end

@interface RNSlideViewController : UIViewController

@property (nonatomic ,copy) NSArray *items ;

@property(nonatomic) NSUInteger selectedIndex;

@property(nonatomic, weak) id<RNSlideViewControllerDelegate> delegate;

- (void)reloadWithScrollView:(UIScrollView *)scrollView;

@end
