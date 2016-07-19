//
//  KLWebViewHelps.h
//  kinglianHealthUser
//
//  Created by IMac on 15/11/27.
//  Copyright © 2015年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KLWebViewHelps : NSObject

/**
 *  HRHttpServer 单例初始化实例
 *
 *  @return singleton
 */
+ (instancetype)shareInstance;


/**
 *  取得本地url
 *
 *  @param typeString html文件名
 *
 *  @return 本地html的url
 */
-(NSURL *)getURLWithType:(NSString *)typeString;

/**
 *  获取本地js文件
 *
 *  @param typeString js文件名
 *
 *  @return js的文件string类型
 */
-(NSString *)getJavaScriptStringWithType:(NSString *)typeString;

/**
 *  获取完整的h5链接
 *
 *  @param fileName h5文件名
 *  @param data     h5需要传的参数
 *
 *  @return 获得可加载的url_string
 */
-(NSURL *)getCompleteUrlWithHttpFileName:(NSString *)fileName jsonData:(NSString *)data;

/**
 *  获取tmp中的H5文件
 *
 *  @param fileName 文件名（H5）
 *
 *  @return tmp中的文件路径
 */
- (NSURL *)getFileURLForTmpWithFileName:(NSString *)fileName;

@end
