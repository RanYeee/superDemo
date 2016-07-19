//
//  DateTools.h
//  BloodTest
//
//  Created by IMac on 16/4/11.
//  Copyright © 2016年 kinglian. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DateTools : NSObject


+(NSString *)getDurationWithTime:(NSString *)timeStr;

+(NSInteger )getDurationIndexWithTime:(NSString *)timeStr;

- (NSString *)getDurationWithTime:(NSString *)timeStr;


+ (NSString *)dateStringWithDate:(NSDate *)date DateFormat:(NSString *)dateFormat;

@end
