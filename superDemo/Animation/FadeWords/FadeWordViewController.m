//
//  FadeWordViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/3.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "FadeWordViewController.h"
#import "FadeWordView.h"
#import "BezierView.h"

@interface FadeWordViewController ()

@property (nonatomic ,copy) NSMutableArray *mutiArray;

@end

@implementation FadeWordViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    self.title = @"FadeWordView";
    
    FadeWordView *fadeView = [[FadeWordView alloc]initWithFrame:CGRectMake(0, 0, 100, 100)];
    
    fadeView.center = self.view.center;
    
    fadeView.text = @"Loading...";
    
    [self.view addSubview:fadeView];
    
    [fadeView fadeToRightWithDuration:1.5f isAnimation:YES];
    
//    BezierView *bezier = [[BezierView alloc]init];
//    bezier.frame = self.view.bounds;
//    [self.view addSubview:bezier];


}


@end
