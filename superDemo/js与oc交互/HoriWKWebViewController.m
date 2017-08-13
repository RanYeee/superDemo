//
//  HoriWKWebViewController.m
//  SuperDemo
//
//  Created by Rany on 2017/8/9.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import "HoriWKWebViewController.h"
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


@interface HoriWKWebViewController ()<WKUIDelegate,WKNavigationDelegate>

@property(nonatomic, strong) WKWebView *webView;

@end

@implementation HoriWKWebViewController

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
    

    //创建wkwebview
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds
                                      configuration:config];
    
    [self.view addSubview:self.webView];
    
//    NSURL *path = [[NSBundle mainBundle] URLForResource:@"testHtml" withExtension:@"html"];
    NSString* baseLocalURLString = [[NSBundle mainBundle] pathForResource:@"testHtml" ofType:@"html" inDirectory:@"html"];
    
    NSURL *path = [NSURL fileURLWithPath:baseLocalURLString];

    [self.webView loadRequest:[NSURLRequest requestWithURL:path]];
    
    // 导航代理
    self.webView.navigationDelegate = self;
    // 与webview UI交互代理
    self.webView.UIDelegate = self;
    
    
    //webview 进度条
    [self.webView addObserver:self forKeyPath:@"estimatedProgress" options:NSKeyValueObservingOptionNew context:NULL];

}

#pragma mark - WKUIDelegate
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
        NSLog(@"OC中未找到[ %@ ]方法",methodName);
        completionHandler(@"");
    }
    
    
}

#pragma mark - js需要调用的方法


/**
 测试用

 @param responseObject js回传的数据字典
 */
- (void)log:(id)responseObject
{
    NSLog(@"js回传的数据字典: %@",responseObject);
}

/**
 * 选中图片
 */

- (void)selectPicture:(id)responseObject
{
    // 图片上传之后调用js返回结果给网页 onPictureSelected(String json)
}


/**
 切换到全屏

 @param responseObject 是否全屏
 */
- (void)switchFullScreen:(id)responseObject
{
    NSString *fulllScreen = responseObject[@"isFulllScreen"];
    
    BOOL isFullScreen = [fulllScreen isEqualToString:@"true"];
    
    if (isFullScreen) {
        //全屏
        
    }else{
        //非全屏
        
    }
}


/**
 ActivityIndicator
 */
- (void)showProgressDialog
{
    
}


/**
 以原生界面activity的形式打开一个url

 @param responseObject js回传的url
 */
- (void)showActivity:(id)responseObject
{
    
    
}


/**
 关闭当前页面
 */
- (void)closeActivity
{
     [self.navigationController popViewControllerAnimated:YES];
}


/**
 调用支付接口进行支持

 @param responseObject js传递的参数
 @return 回调支付结果
 */
- (NSString *)pay:(id)responseObject
{
    
    return @"1111112333";
}



/**
 打开地图

 @param responseObject js回传的有关地图的参数
 */
- (void)showMap:(id)responseObject
{
    
}


/**
 显示提示框

 @param responseObject js回传的有关地图的参数
 */
- (void)showAlert:(id)responseObject
{
    [HRProgressHUD showHUDInView:self.view onlyMessage:responseObject[@"message"]];
}

/**
 ajax的情况下设置标题

 @param responseObject js回传标题数据
 */
- (void)setNavTitle:(id)responseObject
{
    
}


/**
 以原生界面activity的形式打开一个url

 @param responseObject js回传的数据
 */
- (void)showActivitySpecial:(id)responseObject
{
    
}

//跳转到支付宝支付界面
- (void)showAliPayActivity:(id)responseObject
{
    
    
}

//判断是否安装支付宝客户端
- (NSString *)isAliPayInstall
{
    return @"YES";
}

//判断当前的token是否是需要登录
- (NSString *)needLogin:(id)responseObject
{
    return @"yes";
}


/**
 实时聊天联系某人

 @param responseObject @param jid  xmpp账号
 */
- (void)chatWith:(id)responseObject
{
    
}

/**
 后退一步
 */
- (void)popUrl
{
    [self.webView goBack];
}

/**
 打开个人中心我的订单界面
 */
- (void)showMyOrdersActivity
{

}

@end
