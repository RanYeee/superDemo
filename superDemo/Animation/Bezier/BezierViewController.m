//
//  BezierViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/4.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "BezierViewController.h"
#import "RNProgressHUD.h"

@interface BezierViewController ()

@property (nonatomic,strong) CAShapeLayer *shapeLayer;

@property (nonatomic,strong) NSTimer *timer;

@end

@implementation BezierViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];

    
    RNProgressHUD *hud = [[RNProgressHUD alloc]initWithFrame:CGRectMake(0, 0, 50, 50)];
    
    hud.center  = self.view.center;
    
    [self.view addSubview:hud];
    
    [hud showHUD];

}

@end
