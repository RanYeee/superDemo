//
//  ChildViewController.h
//  SuperDemo
//
//  Created by Rany on 16/8/16.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
@class ChildViewController;

@protocol  ChildViewControllerDelegate<NSObject>

-(void)didScroll:(UIScrollView *)scrollView;

@end

@interface ChildViewController : UIViewController

@property (nonatomic ,weak) id<ChildViewControllerDelegate> delegate;

@end
