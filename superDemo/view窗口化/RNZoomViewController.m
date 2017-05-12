//
//  RNZoomViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/5/8.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "RNZoomViewController.h"
#import "RNZoomView.h"
#import <NetworkExtension/NetworkExtension.h>
@interface RNZoomViewController ()
{
    UIButton *_zoomButton;
}
@end

@implementation RNZoomViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.view.backgroundColor = [UIColor whiteColor];
    
    _zoomButton = [UIButton buttonWithType:UIButtonTypeCustom];
    
    _zoomButton.frame = CGRectMake(0, 0, 80, 40);
    
    _zoomButton.center = self.view.center;
    
    //    _zoomButton.backgroundColor = [UIColor purpleColor];
    
    [_zoomButton setTitle:@"打开视图" forState:UIControlStateNormal];
    
    [_zoomButton setTitleColor:[UIColor brownColor] forState:UIControlStateNormal];
    
    [_zoomButton addTarget:self action:@selector(openZoomView) forControlEvents:UIControlEventTouchUpInside];
    
    [self.view addSubview:_zoomButton];
  

}

-(void)openZoomView
{
    
    RNZoomView *zoomView = [[RNZoomView alloc]init];
    
    [zoomView show];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
    
    
}


@end
