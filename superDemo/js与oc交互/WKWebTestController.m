//
//  WKWebTestController.m
//  SuperDemo
//
//  Created by Rany on 2017/8/8.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "WKWebTestController.h"
#import <WebKit/WKWebView.h>
#import <WebKit/WKWebViewConfiguration.h>
#import <WebKit/WKPreferences.h>
#import <WebKit/WKProcessPool.h>
#import <WebKit/WKUserContentController.h>
#import <WebKit/WKScriptMessage.h>
#import "NSDictionary+JSON.h"

#define SuppressPerformSelectorLeakWarning(Stuff) \
do { \
_Pragma("clang diagnostic push") \
_Pragma("clang diagnostic ignored \"-Warc-performSelector-leaks\"") \
Stuff; \
_Pragma("clang diagnostic pop") \
} while (0)

@interface WKWebTestController ()<WKScriptMessageHandler,WKUIDelegate,WKNavigationDelegate>
@property(nonatomic, strong) WKWebView *webView;
@end

@implementation WKWebTestController

- (void)viewDidLoad {
    [super viewDidLoad];

    //配置偏好设置
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    config.preferences = [[WKPreferences alloc] init];
    // 默认为0
    config.preferences.minimumFontSize = 10;
    // 默认认为YES
    config.preferences.javaScriptEnabled = YES;
    // 在iOS上默认为NO，表示不能自动通过窗口打开
    config.preferences.javaScriptCanOpenWindowsAutomatically = NO;
    
    // web内容处理池，由于没有属性可以设置，也没有方法可以调用，不用手动创建
    config.processPool = [[WKProcessPool alloc] init];
    
    // 通过JS与webview内容交互
    config.userContentController = [[WKUserContentController alloc] init];
    
    // 注入JS对象方法名AppModel，当JS通过AppModel来调用时，
    // 我们可以在WKScriptMessageHandler代理中接收到
    [config.userContentController addScriptMessageHandler:self name:@"setNavTitle"];
    
    //创建wkwebview
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds
                                      configuration:config];
    
    [self.view addSubview:self.webView];
    
//    NSURL *path = [[NSBundle mainBundle] URLForResource:@"testHtml" withExtension:@"html"];
    NSString* baseLocalURLString = [[NSBundle mainBundle] pathForResource:@"testHtml" ofType:@"html" inDirectory:@"html"];
    
    NSURL *path = [NSURL fileURLWithPath:baseLocalURLString];
//    NSURL *path = [NSURL URLWithString:@"https://mms.hori-gz.com:8443/mms/html5/supermarket/shoppingcart.htm?householdSerial=8320000110100101031040&token=150217688644dbc02110055a4186854d&organizationSeq=4400100001&clientType=ios&areaCode=00001"];
    
    [self.webView loadRequest:[NSURLRequest requestWithURL:path]];
    
    // 导航代理
    self.webView.navigationDelegate = self;
    // 与webview UI交互代理
    self.webView.UIDelegate = self;
    
    
    //right button
    UIBarButtonItem *rightItem = [[UIBarButtonItem alloc]initWithTitle:@"编辑" style:UIBarButtonItemStylePlain target:self action:@selector(editAction)];
    
    self.navigationItem.rightBarButtonItem = rightItem;
}

- (void)editAction
{
    NSString *javaScript = @"setEditOperate()";
    
    [self.webView evaluateJavaScript:javaScript completionHandler:^(id _Nullable idss, NSError * _Nullable error) {
        
    }];
    
    self.navigationItem.rightBarButtonItem.title = @"完成";

}

#pragma mark - WKScriptMessageHandler
- (void)userContentController:(WKUserContentController *)userContentController
      didReceiveScriptMessage:(WKScriptMessage *)message {
    
    //参数
    id parame = message.body;
    
    //方法名
    NSString *methodName = nil;
    
    if (parame) {
        
        methodName = [message.name stringByAppendingString:@":"];
    
    }else{
        
        methodName = message.name;
    }
    
    // 调用方法
    SEL selector = NSSelectorFromString(methodName);
    
    if ([self respondsToSelector:selector]) {
        
        [self performSelector:selector withObject:parame afterDelay:0.0];
        
    }else{
        
        NSLog(@"方法未找到");
    }

   
}

- (void)popNavigation
{
    [self.navigationController popViewControllerAnimated:YES];
}

- (void)setNavTitle:(id)titleString
{
    self.title = titleString[@"title"];
    NSLog(@"》》》》》%@",titleString);

}

- (void)callWithValue:(id )string
{
    NSLog(@"》》》》》%@",string);
}

// JS端调用prompt函数时，会触发此方法
// 要求输入一段文本
// 在原生输入得到文本内容后，通过completionHandler回调给JS
- (void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(nullable NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * __nullable result))completionHandler {
        
    NSArray *componentsPrompt = [prompt componentsSeparatedByString:@"?"];
    
    NSDictionary *respondObj = [NSDictionary initWithJsonString:componentsPrompt[1]];
    
    NSString *methodName = nil;

    if (respondObj) {
        
        methodName = [componentsPrompt[0] stringByAppendingString:@":"];
        
    }else{
        
        methodName = componentsPrompt[0];
    }
    
    NSLog(@"method = %@,respondObj>>> %@",methodName,respondObj);

    // 调用方法
    SEL selector = NSSelectorFromString(methodName);
    
    if ([self respondsToSelector:selector]) {

        id callBack;
        SuppressPerformSelectorLeakWarning(
            callBack = [self performSelector:selector withObject:respondObj]
                                           );
        
        
        if (callBack) {
            
            completionHandler(callBack);

        }else{
            
            completionHandler(@"");

        }
        
    }else{
        
        NSLog(@"方法未找到");
    }

    

    
//    if ([prompt isEqualToString:@"give me token"]) {
//        
//        completionHandler(@"token:0509280954850920200");
//
//    }

}

- (NSString *)pay:(id)payInfo
{
    
    NSLog(@"payInfo>>>> %@",payInfo);
    
    return @"success";
}

- (void)loog:(id)log
{
    NSLog(@"log>>>> %@",log);
}

@end
