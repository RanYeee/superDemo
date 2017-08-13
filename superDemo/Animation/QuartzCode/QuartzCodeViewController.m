//
//  QuartzCodeViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/7/20.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "QuartzCodeViewController.h"
#import "StarLoadingView.h"
#import "SearchEmptyView.h"
@interface QuartzCodeViewController ()

@end

@implementation QuartzCodeViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.view.backgroundColor = [UIColor whiteColor];
    
    SearchEmptyView *loadingView = [[SearchEmptyView alloc]initWithFrame:CGRectMake(0, 0, 100, 100)];
    
    loadingView.center = self.view.center;
    
    [self.view addSubview:loadingView];
    
    [loadingView addUntitled1Animation];
    
 
}

@end
