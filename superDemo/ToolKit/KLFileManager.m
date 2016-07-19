//
//  KLFileManager.m
//  SuperDemo
//
//  Created by Rany on 16/7/7.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "KLFileManager.h"

NSString *const kIsCopyH5ToTmp = @"kIsCopyH5ToTmp";

@implementation KLFileManager

+ (NSArray *)contentOfDirectoryWithPath:(NSString *)dPath
{
    NSURL *folderURL = [NSURL fileURLWithPath:dPath];
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSError *error = nil;
    NSArray *folderContents = [fileManager
                               contentsOfDirectoryAtURL:folderURL
                               includingPropertiesForKeys:nil
                               options:0
                               error:&error];
    
    return folderContents;
}

+ (void)createHTMLDirectory
{
    
    NSString *htmlDir = [NSString stringWithFormat:@"%@html",NSTemporaryDirectory()];
    
    NSString *jsDir = [htmlDir stringByAppendingString:@"/js"];
    
    NSString *cssDir = [htmlDir stringByAppendingString:@"/css"];

    NSString *imageDir = [htmlDir stringByAppendingString:@"/images"];
    
    NSArray *dirArr = @[htmlDir,jsDir,cssDir,imageDir];
    
    NSFileManager *fileManager = [[NSFileManager alloc]init];
    
    [dirArr enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
       
        [fileManager createDirectoryAtPath:obj withIntermediateDirectories:YES attributes:nil error:nil];
        
    }];
    
    
    NSString* baseLocalURLString = [[NSBundle mainBundle] pathForResource:@"create_order" ofType:@"html" inDirectory:@"html"];
    
    NSRange range = [baseLocalURLString rangeOfString:@"create_order.html"];
    
    NSString *htmlPath = [baseLocalURLString substringToIndex:range.location];
    
    NSString *cssPath = [htmlPath stringByAppendingString:@"css/"];
    
    NSString *jsPath = [htmlPath stringByAppendingString:@"js/"];
    
    NSString *imagePath = [htmlPath stringByAppendingString:@"images/"];
    
    
    NSArray *htmlArray = [self contentOfDirectoryWithPath:htmlPath];
    
    NSArray *cssArray = [self contentOfDirectoryWithPath:cssPath];
    
    NSArray *jsArray = [self contentOfDirectoryWithPath:jsPath];
    
    NSArray *imageArray = [self contentOfDirectoryWithPath:imagePath];
    
    NSArray *sourceArray = @[htmlArray,jsArray,cssArray,imageArray];

    
    [sourceArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
       
        [self copyFileWithFileArray:obj ToTempWithFileURL:[NSURL URLWithString:[NSString stringWithFormat:@"file://%@",dirArr[idx]]]];
        
    }];
    


}

+ (void)copyFileWithFileArray:(NSArray *)fileArray ToTempWithFileURL:(NSURL *)fileUrl
{
    
    
    NSFileManager *fileManager = [[NSFileManager alloc]init];
    
    [fileArray enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
       
        NSURL *h5URL = obj;
        
        NSURL *dstURL = [fileUrl URLByAppendingPathComponent:h5URL.lastPathComponent];
        
        [fileManager copyItemAtURL:obj toURL:dstURL error:nil];
        
    }];
    
    [[NSUserDefaults standardUserDefaults]setBool:YES forKey:kIsCopyH5ToTmp];

}

@end
