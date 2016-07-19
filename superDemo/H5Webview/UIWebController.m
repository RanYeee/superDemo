//
//  UIWebController.m
//  SuperDemo
//
//  Created by Rany on 16/7/7.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "UIWebController.h"

@interface UIWebController ()

@end

@implementation UIWebController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    UIWebView *webview = [[UIWebView alloc] initWithFrame:self.view.bounds];
    
    
    [webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://192.168.0.143/charts/charts.html"]]];
    
    [self.view addSubview:webview];
    
    NSLog(@"_webView>>> %@",webview);
    
}



@end
