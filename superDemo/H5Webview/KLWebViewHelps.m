//
//  KLWebViewHelps.m
//  kinglianHealthUser
//
//  Created by IMac on 15/11/27.
//  Copyright © 2015年 Rany. All rights reserved.
//

#import "KLWebViewHelps.h"

@implementation KLWebViewHelps

+ (instancetype)shareInstance
{
    static KLWebViewHelps *webViewHelps = nil;
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        
        webViewHelps = [[KLWebViewHelps alloc]init];
        
    });
    
    return webViewHelps;
}

-(NSURL *)getURLWithType:(NSString *)typeString{
    
    
    NSString* baseLocalURLString = [[NSBundle mainBundle] pathForResource:typeString ofType:@"html" inDirectory:@"html"];
    
    NSURL *url = [NSURL fileURLWithPath:baseLocalURLString];
    
    return url;

}

-(NSString *)getJavaScriptStringWithType:(NSString *)typeString{
    
     NSString* scriptPath = [[NSBundle mainBundle] pathForResource:typeString ofType:@"js" inDirectory:@"html/js"];
    
    NSString *scriptString = [NSString stringWithContentsOfFile:scriptPath encoding:NSUTF8StringEncoding error:nil];

    return scriptString;
}

-(NSURL *)getCompleteUrlWithHttpFileName:(NSString *)fileName jsonData:(NSString *)data{
    
    NSString *htmlFile = nil;
    
    if ([fileName rangeOfString:@".html"].length > 0 ) {
        
        NSRange range = NSMakeRange(0, fileName.length - 5);
        
        htmlFile = [fileName substringWithRange:range];
        
        NSLog(@"");
        
    }else{
        
        htmlFile = fileName;
    }
    
    NSURL *fileURL = [[KLWebViewHelps shareInstance]getURLWithType:htmlFile];
    
//    KLHttpServer *httpServer = [KLHttpServer shareInstance];
//    
//    NSString *appendStr = [NSString stringWithFormat:@"?server=%@&server_port=%@&token=%@&data=%@",httpServer.serverIP,httpServer.serverPort,httpServer.newestToken,data];
//    
//    NSString *absoultStr_URL = [NSString stringWithFormat:@"%@%@",fileURL,appendStr];
//    
//    NSString *encodedString = [absoultStr_URL stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    return fileURL;

}

- (NSURL *)getFileURLForTmpWithFileName:(NSString *)fileName
{
    
    NSString *fileURL = [NSString stringWithFormat:@"file://%@html/%@.html",NSTemporaryDirectory(),fileName];
    
    return [NSURL URLWithString:fileURL];
}
@end
