//
//  MyVideoController.m
//  SuperDemo
//
//  Created by Rany on 16/5/25.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "MyVideoController.h"
#import "LocalVideoView.h"

@interface MyVideoController ()
{
    LocalVideoView *localVideo;

}
@end

@implementation MyVideoController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor whiteColor];
    
    localVideo = [[LocalVideoView alloc]initWithFrame:CGRectMake(0, 64, 100, 50)];
    
    [self.view addSubview:localVideo];
    
    UIButton *button = [[UIButton alloc]initWithFrame:CGRectMake(100, 300, 100, 50)];
    
    button.backgroundColor = [UIColor blueColor];
    
    [button addTarget:self action:@selector(dd) forControlEvents:UIControlEventTouchUpInside];

    [self.view addSubview:button];
}

-(void)dd
{
    [localVideo swapFrontAndBackCameras];
}
@end
