//
//  NSString+Additions.h
//  SmartCommunity
//
//  Created by Harvey Huang on 15-3-17.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (Additions)

/**
 *  doc沙盒路径
 */
+ (NSString *)documentPath;


/**
 *  cache沙盒路径
 */
+ (NSString *)cachePath;


/**
 *  当前具体时间
 */
+ (NSString *)formatCurDate;


/**
 *  当前日期
 */
+ (NSString *)formatCurDay;

+ (NSString *)formateDate:(NSString *)dateString;


/**
 *  获取App版本号
 */
+ (NSString *)getAppVer;

+ (NSString *)getAppName;

+ (NSString *)createUuid;


/**
 *  去除字符串回车
 */
- (NSString *)trim;


/**
 *  去除字符串所有空格
 */
- (NSString*)removeAllSpace;


- (NSURL *)toURL;

- (NSString *) MD5;

- (NSString *)stringByRemovingHTML;


/**
 * 是否包含子字符串
 */
- (BOOL) isContainsString:(NSString*)substring;

- (BOOL) isOlderVersionThan:(NSString*)otherVersion;

- (BOOL) isNewerVersionThan:(NSString*)otherVersion;

- (BOOL) checkTelNumberInput;

/* IP地址验证 */
- (BOOL) isValidateIP;

- (BOOL) isEmpty;




- (NSString *)replaceUnicode:(NSString *)unicodeStr;


/**
 *  获取字符串的尺寸
 *
 *  @param textContent 内容
 *  @param textFont    字体尺寸
 *  @param maxSize     最大尺寸
 *
 *  @return 计算后的尺寸size
 */
+ (CGSize)getContentSize:(NSString *)textContent
              fontOfSize:(CGFloat)textFont
             maxSizeMake:(CGSize)maxSize;

/**
 *  字典转Sting json
 *
 *  @param object 字典
 *
 *  @return json
 */
+(NSString*)DataTojsonString:(id)object;

/**
 *  是否为空字符串
 *
 *  @param string 字符串
 *
 *  @return @“”
 */
+ (NSString *)isBlankString:(NSString *)string;


NSString *NSStringFromInteger(NSInteger integer);


@end
