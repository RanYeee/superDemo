//
//  FadeWordViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/3.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "FadeWordViewController.h"
#import "FadeWordView.h"

@interface FadeWordViewController ()

@end

@implementation FadeWordViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    self.title = @"FadeWordView";
    
    FadeWordView *fadeView = [[FadeWordView alloc]initWithFrame:self.view.bounds];
    
    fadeView.text = @"Hello World";
    
    [self.view addSubview:fadeView];
    
    [fadeView fadeToRightWithDuration:3.0f isAnimation:YES];
    
}


@end
