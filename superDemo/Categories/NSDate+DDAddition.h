//
//  NSDate+DDAddition.h
//  IOSDuoduo
//
//  Created by 独嘉 on 14-6-5.
//  Copyright (c) 2014年 dujia. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSDate (DDAddition)

- (NSString*)transformToFuzzyDate;

- (NSString*)promptDateString;

/**
 *  判断当前时间段是否在某一个时间段之间
 *
 *  @param fromDateStr 开始时间
 *  @param toDateStr   结束时间
 *
 *  @return BOOL value
 */
+ (BOOL)isCurrentDateBetweenFromDateStr:(NSString *)fromDateStr toDateStr:(NSString *)toDateStr;

//拿到数据中的年
- (BOOL)isThisYear;

//拿到数据中的昨天
- (BOOL)isYesterday;

//拿到数据中的今天
- (BOOL)isToday;

/**
 *  增减时间（以当前时间为基准）
 *
 *  @param year  1为1年以后的日期 -1为年之前的日期 0为今年
 *  @param month 1为1个月以后的日期 -1为一个月之前的日期 0为本月
 *  @param day   1为1天以后的日期 -1为一天之前的日期 0为今天
 *
 *  @return 时间字符串
 */
+(NSString*)getPastORFutureDateWithYear:(int)year month:(int)month day:(int)day;

@end
