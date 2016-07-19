//
//  WKWebController.h
//  SuperDemo
//
//  Created by Rany on 16/7/7.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@interface WKWebController : UIViewController

@property (nonatomic,strong)WKWebView *webView;

@property (nonatomic ,copy) NSString *port; //用于结果回调标识

@end
