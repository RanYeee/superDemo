//
//  SlideViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/16.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "SlideViewController.h"
#import "RNSlideViewController.h"
#import "ChildViewController.h"

@interface SlideViewController ()<RNSlideViewControllerDelegate,ChildViewControllerDelegate>

@property (nonatomic,strong) RNSlideViewController *slideVC;

@end

@implementation SlideViewController

- (instancetype)init
{
    self = [super init];
    if (self) {
        
        [self initContent];
    }
    return self;
}

- (void)initContent
{
    _slideVC = [[RNSlideViewController alloc]init];
    
    _slideVC.delegate = self;
    
    
    NSArray *names = @[
                       @"TAB ONE",
                       @"TWO",
                       @"TAB THREE",
                       @"FOUR",
                       @"FIVE",
                       @"SIX",
                       @"SEVEN",
                       @"EIGHT",
                       @"NINE",
                       @"TEN"
                       ];
    _slideVC.view.frame = self.view.bounds;

    [_slideVC setItems:names];

}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    

    
    
    [self addChildViewController:_slideVC];
    
    [self.view addSubview:_slideVC.view];
    
    [_slideVC didMoveToParentViewController:self];
    
}

-(UIViewController *)tabBarViewController:(RNSlideViewController *)viewController viewControllerAtIndex:(NSUInteger)index
{
    ChildViewController *controller =
    [[ChildViewController alloc] init];
//    dispatch_async(dispatch_get_main_queue(), ^{
//    });
    controller.delegate = self;
    return controller;
}

-(void)tabBarViewController:(RNSlideViewController *)viewController didMoveToIndex:(NSUInteger)index
{
    
}

-(void)didScroll:(UIScrollView *)scrollView
{
    
    [self.slideVC reloadWithScrollView:scrollView];
}
@end
