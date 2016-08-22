//
//  HRAppMacro.h
//  SmartCommunity
//
//  Created by Harvey Huang on 15-3-19.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#ifndef SmartCommunity_HRAppMacro_h
#define SmartCommunity_HRAppMacro_h

#import "UIView+DDAddition.h"
#import "UIColor+HRExtension.h"
#import "HRProgressHUD.h"
#import "Masonry.h"
#import "UIBarButtonItem+HRNagativeSpace.h"
#import "NSObject+log.h"
#import "MJRefresh.h"
#import "UIImageView+WebCache.h"
#import "UIButton+Prescription.h"
#import "NSDate+DDAddition.h"
#import "NSString+Additions.h"
#import "UIButton+WebCache.h"
#import "Util.h"



#ifndef __OPTIMIZE__
# define NSLog(...) NSLog(__VA_ARGS__)
#else
# define NSLog(...) {}
#endif


#ifdef  DEBUG
#define debugLog(...)    NSLog(__VA_ARGS__)
#define debugMethod()    NSLog(@"%s", __func__)
#define debugError()     NSLog(@"Error at %s Line:%d", __func__, __LINE__)
#else
#define debugLog(...)
#define debugMethod()
#define debugError()
#endif

#define RNLog(x)    NSLog(@#x)

//G－C－D
#define BACK(block) dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), block)
#define MAIN(block) dispatch_async(dispatch_get_main_queue(),block)

#define kWindow [UIApplication sharedApplication].keyWindow

#define objectOrNull(obj) ((obj) ? (obj) : [NSNull null])
#define objectOrEmptyStr(obj) ((obj) ? (obj) : @"")

#define isNull(x)             (!x || [x isKindOfClass:[NSNull class]])
#define toInt(x)              (isNull(x) ? 0 : [x intValue])
#define isEmptyString(x)      (isNull(x) || [x isEqual:@""] || [x isEqual:@"(null)"])

#define sleep(s);             [NSThread sleepForTimeInterval:s];
#define Syn(x)                @synthesize x = _##x

#define RGBA(r,g,b,a)         [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]
#define RGB(r,g,b)            [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:1.0]
#define BoldSystemFont(size)  [UIFont boldSystemFontOfSize:size]
#define systemFont(size)      [UIFont systemFontOfSize:size]
#define beginAutoPool         NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init]; {
#define endAutoPool           } [pool release];
#define skipspace(c)          while (isspace(*c)) ++c
#define skipUntil(c,x)        while (x != *c) ++c
#define TheWindowHeight      ([UIDevice isAfterOS7] ? [UIScreen mainScreen].bounds.size.height : ([UIScreen mainScreen].bounds.size.height - 20))
#define IntToNumber(int)      ([NSNumber numberWithInt:int])
#define isIOS7 [[UIDevice currentDevice].systemVersion doubleValue]>=7.0?YES:NO
#define SYSTEM_VERSION        [[[UIDevice currentDevice] systemVersion] floatValue]
#define STATUSBAR_HEIGHT      [[UIApplication sharedApplication] statusBarFrame].size.height
#define NAVBAR_HEIGHT         (44.f + ((SYSTEM_VERSION >= 7) ? STATUSBAR_HEIGHT : 0))
#define FULL_WIDTH            SCREEN_WIDTH
#define FULL_HEIGHT           (SCREEN_HEIGHT - ((SYSTEM_VERSION >= 7) ? 0 : STATUSBAR_HEIGHT))
#define CONTENT_HEIGHT        (FULL_HEIGHT - NAVBAR_HEIGHT)
#define isBelowIOS9           [[UIDevice currentDevice].systemVersion doubleValue]<9.0?YES:NO

#define FileManager     ([NSFileManager defaultManager])
#define TheUserDefaults ([NSUserDefaults standardUserDefaults])
#define PhotosMessageDir ([[NSString documentPath] stringByAppendingPathComponent:@"/PhotosMessageDir/"])
#define VoiceMessageDir ([[NSString documentPath] stringByAppendingPathComponent:@"/VoiceMessageDir/"])
#define BlacklistDir    ([[NSString documentPath] stringByAppendingPathComponent:@"/BlacklistDir/"])
#define WS(self)    __weak __typeof(&*self)weakSelf = self;
#define RNWeakSelf(type)  __weak typeof(type) weak##type = type;
#define SCREEN_WIDTH  ([UIScreen mainScreen].bounds.size.width)
#define SCREEN_HEIGHT ([UIScreen mainScreen].bounds.size.height)

#define IPHONE4 ([[UIScreen mainScreen] bounds].size.height == 480)
#define IS_AboveIOS7   [[[UIDevice currentDevice] systemVersion] floatValue]>=7.0?YES:NO
#define kSystemVersion [[UIDevice currentDevice]systemVersion].floatValue



#define isRespSuccess [[responseObj objectForKey:@"result"] isEqualToString:@"0"]


#define kDefaultRedColor        @"#DD434D"
#define kDefaultGrayColor       @"#E5E5E5"
#define kDefaultBackgroundColor @"#EAEAEA"
#define kTextRedColor           @"#FD5256"
#define kDefaultPinkColor       @"#FFEEEE"

// 创建图片
#define DefaultUserHeadPortait IMAGE(@"avatar_default")
#define DefaultColorGreen UIColorFromRGB(0x26b7bc)

#define IMAGE(imageName)        ([UIImage imageNamed:imageName])  

//按比例获取高度
#define  WGiveHeight(HEIGHT) HEIGHT * [UIScreen mainScreen].bounds.size.height/568.0

//按比例获取宽度
#define  WGiveWidth(WIDTH) WIDTH * [UIScreen mainScreen].bounds.size.width/320.0

//按比例获取字体大小 以iphone5屏幕为基准
#define  WGiveFontSize(SIZE) SIZE * [UIScreen mainScreen].bounds.size.width/320.0

//MBProgressHUD提示框

// 加载
#define kShowNetworkActivityIndicator() [UIApplication sharedApplication].networkActivityIndicatorVisible = YES

// 收起加载

#define kHideNetworkActivityIndicator()      [UIApplication sharedApplication].networkActivityIndicatorVisible = NO

// 设置加载

#define NetworkActivityIndicatorVisible(x)  [UIApplication sharedApplication].networkActivityIndicatorVisible = x

#define kWindow [UIApplication sharedApplication].keyWindow

#define kBackView         for (UIView *item in kWindow.subviews) {if(item.tag == 10000){[item removeFromSuperview];UIView * aView = [[UIView alloc] init];aView.frame = [UIScreen mainScreen].bounds;aView.tag = 10000;aView.backgroundColor = [[UIColor blackColor] colorWithAlphaComponent:0.3];[kWindow addSubview:aView];}}

//显示hud
#define kShowHUDAndActivity kBackView;[MBProgressHUD showHUDAddedTo:kWindow animated:YES];kShowNetworkActivityIndicator()
//隐藏hud
#define kHiddenHUD [MBProgressHUD hideAllHUDsForView:kWindow animated:YES]

#define kRemoveBackView         for (UIView *item in kWindow.subviews) {if(item.tag == 10000){[UIView animateWithDuration:0.4 animations:^{item.alpha = 0.0;} completion:^(BOOL finished) {[item removeFromSuperview];}];}}

#define kShowHUDToast(message)   [HRProgressHUD showHUDInView:kWindow onlyMessage:message];

#define kShowErrorToast(msg) [HRProgressHUD showErrorHUD:kWindow message:msg];

#define kHiddenHUDAndAvtivity kRemoveBackView;kHiddenHUD;kHideNetworkActivityIndicator()

/******** User Location Config key ********/

//服务器地址和端口
#define kHRJsonServerIPKey   @"kHRJsonServerIPKey"
#define kHRJsonServerPortKey @"kHRJsonServerPortKey"


//登录配置
#define kHRLoginAccoutKey     @"kHRLoginAccoutKey"
#define kHRLoginPasswordKey   @"kHRLoginPasswordKey"
#define kHRUserAccountKey     @"kHRUserAccountKey"
#define kHRisRememberPwdKey   @"kHRisRememberPwdKey"
#define kHRAccountTypeKey     @"kHRAccountTypeKey"
#define kXMPPmyJIDKey         @"kXMPPmyJIDKey"
#define kHRisHadLoginKey      @"kHRisHadLoginKey"
#define kHRIsOpenTalkKey      @"kHRIsOpenTalkKey"

#define kHRServerConfigsKey   @"kHRServerConfigsKey"
#define kHRUserInfoKey        @"kHRUserInfoKey"

#define kOuterTalkbackSipIp   @"outerTalkbackSipIp"  
#define kOuterTalkbackSipPort @"outerTalkbackSipPort"

#define kFileServerUrl        @"fileServerUrl"

#define kisSipInitConfig      @"isSipInitConfig" //是否初始化sip配置

#define KKLServerConfigsKey   @"KKLServerConfigsKey"
//xmpp配置
#define kXMPPHostName         @"kXMPPHostName"
#define kXMPPHostPort         @"kXMPPHostPort"



#endif
