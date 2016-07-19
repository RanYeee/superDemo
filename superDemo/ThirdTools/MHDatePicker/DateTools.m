//
//  DateTools.m
//  BloodTest
//
//  Created by IMac on 16/4/11.
//  Copyright © 2016年 kinglian. All rights reserved.
//

#import "DateTools.h"

@interface DateTools ()

{
    NSInteger _year;
    NSInteger _month;
    NSInteger _day;
}

@end

@implementation DateTools

+(NSString *)getDurationWithTime:(NSString *)timeStr
{
    DateTools *tool = [[DateTools alloc]init];
    
    return [tool getDurationWithTime:timeStr];
}

+(NSInteger)getDurationIndexWithTime:(NSString *)timeStr
{
    DateTools *tool = [[DateTools alloc]init];
    
//    NSLog(@">>>>>>resultLabelIndex = %ld",(long)[tool getDurationIndexWithTime:timeStr]);
    
    return [tool getDurationIndexWithTime:timeStr];
}

- (NSString *)getDurationWithTime:(NSString *)timeStr
{
    
    /**
     空腹      22:00:01-8:00:00
     早餐后      8:00:01-10:00:00
     午餐前      10:00:01-12:00:00
     午餐后      12:00:01-15:00:00
     晚餐前      15:00:01-18:00:00
     晚餐后      18:00:01-20:00:00
     睡前      20:00:01-22:00:00
     */
    
    NSDateFormatter *inputFormatter = [[NSDateFormatter alloc] init];
    [inputFormatter setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"zh_CN"]];
    [inputFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSDate* inputDate = [inputFormatter dateFromString:timeStr];
    if ([self isCurrentDate:inputDate BetweenFromHour:22 toHour:8]) {
        
        return @"空腹";
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:8 toHour:10]){
        
        return @"早餐后";
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:10 toHour:12]){
        
        return @"午餐前";
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:12 toHour:15]){
        
        return @"午餐后";
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:15 toHour:18]){
        
        return @"晚餐前";
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:18 toHour:20]){
        
        return @"晚餐后";
        
    }else {
        
        return @"睡前";
        
    }
    
}


- (NSInteger )getDurationIndexWithTime:(NSString *)timeStr
{
    
    /**
     空腹      22:00:01-8:00:00
     早餐后      8:00:01-10:00:00
     午餐前      10:00:01-12:00:00
     午餐后      12:00:01-15:00:00
     晚餐前      15:00:01-18:00:00
     晚餐后      18:00:01-20:00:00
     睡前      20:00:01-22:00:00
     */
    
    NSString *dateStr = [timeStr componentsSeparatedByString:@" "][0];
    
    NSArray *dateStrArr = [dateStr componentsSeparatedByString:@"-"];
    
    _year = [dateStrArr[0] integerValue];
    
    _month = [dateStrArr[1] integerValue];
    
    _day = [dateStrArr[2] integerValue];
    
    NSDateFormatter *inputFormatter = [[NSDateFormatter alloc] init];
    [inputFormatter setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"zh_CN"]];
    [inputFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    NSDate* inputDate = [inputFormatter dateFromString:timeStr];
    if ([self isCurrentDate:inputDate BetweenFromHour:22 toHour:8]) {
        
        return 0;
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:8 toHour:10]){
        
        return 1;
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:10 toHour:12]){
        
        return 2;
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:12 toHour:15]){
        
        return 3;
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:15 toHour:18]){
        
        return 4;
        
    }else if ([self isCurrentDate:inputDate BetweenFromHour:18 toHour:20]){
        
        return 5;
        
    }else if([self isCurrentDate:inputDate BetweenFromHour:20 toHour:22]){
        
        return 6;
        
    }else{
        
        return -1;

    }
    
    
}

- (BOOL)isCurrentDate:(NSDate *)currentDate BetweenFromHour:(NSInteger)fromHour toHour:(NSInteger)toHour
{
    NSDate *from = [self getCustomDateWithHour:fromHour];
    NSDate *to = [self getCustomDateWithHour:toHour];
    if ([currentDate compare:from]==NSOrderedDescending && [currentDate compare:to]==NSOrderedAscending)
    {
       
        return YES;
    }
    return NO;
}


- (NSDate *)getCustomDateWithHour:(NSInteger)hour
{
    //获取当前时间
    NSDate *currentDate = [NSDate date];
    NSCalendar *currentCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
    NSDateComponents *currentComps = [[NSDateComponents alloc] init];
    
    NSInteger unitFlags = NSYearCalendarUnit | NSMonthCalendarUnit | NSDayCalendarUnit | NSWeekdayCalendarUnit | NSHourCalendarUnit | NSMinuteCalendarUnit | NSSecondCalendarUnit;
    
    currentComps = [currentCalendar components:unitFlags fromDate:currentDate];
    
    //设置当天的某个点
    NSDateComponents *resultComps = [[NSDateComponents alloc] init];
    [resultComps setYear:_year];
    [resultComps setMonth:_month];
    [resultComps setDay:_day];
    [resultComps setHour:hour];
    [resultComps setMinute:00];
    
    NSCalendar *resultCalendar = [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
    return [resultCalendar dateFromComponents:resultComps];
}


+ (NSString *)dateStringWithDate:(NSDate *)date DateFormat:(NSString *)dateFormat
{
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:dateFormat];
    [dateFormatter setLocale:[[NSLocale alloc] initWithLocaleIdentifier:@"zh_CN"]];
    NSString *str = [dateFormatter stringFromDate:date];
    return str ? str : @"";
}
@end
