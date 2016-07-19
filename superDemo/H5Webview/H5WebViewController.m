//
//  H5WebViewController.m
//  SuperDemo
//
//  Created by Rany on 16/5/5.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "H5WebViewController.h"
#import "KLWebViewHelps.h"
#import "UIColor+HRExtension.h"

@interface H5WebViewController ()<UIWebViewDelegate>
@property (nonatomic ,strong) UIWebView *webView;

@end

@implementation H5WebViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    self.view.backgroundColor = [UIColor whiteColor];
    
    self.webView = [[UIWebView alloc]initWithFrame:self.view.bounds];
    
    self.webView.delegate = self;
    
    [self.view addSubview:self.webView];
    
    NSURL *loadURL_String = [[KLWebViewHelps shareInstance]getCompleteUrlWithHttpFileName:@"order_details" jsonData:@""];
    /*
     
     */
    
    NSLog(@">>>>>>%@",loadURL_String);
    
    [self.webView loadRequest:[NSURLRequest requestWithURL:loadURL_String]];
    


}

-(void)viewWillAppear:(BOOL)animated
{
    UIView *statusBarView=[[UIView alloc] initWithFrame:CGRectMake(0, 0, 320, 20)];
    
    statusBarView.backgroundColor=[UIColor colorWithHexString:@"#279ebc"];
    
    [self.view addSubview:statusBarView];
    
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent animated:NO];
    
    self.navigationController.navigationBar.hidden = YES;
}

-(void)viewWillDisappear:(BOOL)animated
{
    
    self.navigationController.navigationBar.hidden = NO;
}

@end
