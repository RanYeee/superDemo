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
#import "ProgressButton.h"

@interface FadeWordViewController ()
{
    ProgressButton *progressBtn;
    
    CGFloat _progress;
}
@property (nonatomic ,copy) NSMutableArray *mutiArray;

@end

@implementation FadeWordViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor blackColor];
    
    self.title = @"FadeWordView";
    
    FadeWordView *fadeView = [[FadeWordView alloc]initWithFrame:CGRectMake(0, 0, 100, 100)];
    
    fadeView.center = self.view.center;
    
    fadeView.text = @"Loading...";
    
    [self.view addSubview:fadeView];
    
    [fadeView fadeToRightWithDuration:1.5f isAnimation:YES];
    
//    BezierView *bezier = [[BezierView alloc]init];
//    bezier.frame = self.view.bounds;
//    [self.view addSubview:bezier];
    
    _progress = 0.0f;
 
    progressBtn = [[ProgressButton alloc]initWithFrame:CGRectMake(10, 200, 100, 50)];
    
    [progressBtn addTarget:self action:@selector(beginProgress) forControlEvents:UIControlEventTouchUpInside];
    
    progressBtn.backgroundColor = [UIColor whiteColor];
    
    [self.view addSubview:progressBtn];
}

- (void)beginProgress
{
    NSTimer *timer = [NSTimer scheduledTimerWithTimeInterval:0.2 target:self selector:@selector(progress) userInfo:nil repeats:YES];
    
    [timer fire];
}

- (void)progress
{
    _progress+=arc4random() % 10;;
    
    [progressBtn startProgressWithProgress:_progress];
}
@end
