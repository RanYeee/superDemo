//
//  WKWebController.m
//  SuperDemo
//
//  Created by Rany on 16/7/7.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "WKWebController.h"
#import "KLWebViewHelps.h"
#import "NSDictionary+JSON.h"

@interface WKWebController ()<WKUIDelegate,WKNavigationDelegate>
@property (nonatomic, strong) UIProgressView *progressView;

@end

@implementation WKWebController

- (void)viewDidLoad {
    [super viewDidLoad];
    

    
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds];

//    if ([[UIDevice currentDevice].systemVersion floatValue] >= 9.0) {
//        // iOS9.
//        NSURL *fileURL = [[KLWebViewHelps shareInstance]getURLWithType:@"create_order"];
//        [self.webView loadFileURL:fileURL allowingReadAccessToURL:fileURL];
//        
//    } else {
//        // iOS8.
//        
//        NSURL *fileURL = [[KLWebViewHelps shareInstance]getFileURLForTmpWithFileName:@"create_order"];
//        NSURLRequest *request = [NSURLRequest requestWithURL:fileURL];
//        [self.webView loadRequest:request];
//    }
    
    NSURL *fileURL = [[KLWebViewHelps shareInstance]getFileURLForTmpWithFileName:@"order_details"];
    NSURLRequest *request = [NSURLRequest requestWithURL:fileURL];
    self.webView.UIDelegate = self;
    [self.webView addObserver:self forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:NULL];
    self.webView.navigationDelegate = self;
    [self.webView loadRequest:request];
    [self.view addSubview:self.webView];
    

    

}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.hidden = YES;
    
    CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
    
    UIView *statusBarView=[[UIView alloc] initWithFrame:CGRectMake(0, 0, screenWidth, 20)];
    
    statusBarView.backgroundColor=[UIColor colorWithHexString:@"#279ebc"];
    
    [self.view addSubview:statusBarView];
    
    [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent animated:NO];
    
    [self createProgressView];
}

-(void)viewWillDisappear:(BOOL)animated
{
    self.navigationController.navigationBar.hidden = NO;
}

#pragma mark -Progress UI
-(void)createProgressView
{
    _progressView = [[UIProgressView alloc]initWithFrame:CGRectMake(0, 0, [UIScreen mainScreen].bounds.size.width, 20)];
    _progressView.progressViewStyle = UIProgressViewStyleBar;
    _progressView.backgroundColor = [UIColor colorWithHexString:@"#279ebc"];
    _progressView.tintColor = [UIColor colorWithHexString:@"#279ebc"];
    _progressView.progressTintColor = [UIColor colorWithRed:0.6421 green:0.9231 blue:0.9089 alpha:0.857976140202703];
    [self.view addSubview:_progressView];
    _progressView.transform = CGAffineTransformMakeScale(1.0f,20.0f);
    
}


#pragma mark - webkit KVO(进度条)

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context {
    
    if ([keyPath isEqualToString:@"estimatedProgress"]) {
        
        if (object == _webView) {
            [self.progressView setAlpha:1.0f];
            [self.progressView setProgress:self.webView.estimatedProgress animated:YES];
            
            if(self.webView.estimatedProgress >= 1.0f) {
                
                [UIView animateWithDuration:0.3 delay:0.3 options:UIViewAnimationOptionCurveEaseOut animations:^{
                    [self.progressView setAlpha:0.0f];
                } completion:^(BOOL finished) {
                    [self.progressView setProgress:0.0f animated:NO];
                }];
                
            }
        }
        else
        {
            [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
        }
        
    }
    else {
        
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

#pragma mark - wkwebView 代理方法

-(void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * _Nullable))completionHandler
{
    NSLog(@"\n WK_prompt = %@",prompt);
    
    
    completionHandler(@"");
    
}


#pragma mark - dealloc
-(void)dealloc
{
    [_webView removeObserver:self forKeyPath:@"estimatedProgress"];
    ;
}
@end
