//
//  NSString+intJudge.h
//  ElectronicPrescribing
//
//  Created by Ducky on 2016/11/17.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSString (intJudge)

//1111aaaa 返回前置数字位置
- (NSInteger)judgeIntIndex;

//纯数字判断
- (BOOL)isPureInt:(NSString *)string;

//数字大小判断  count为最大最小值
- (BOOL)intStringCouldNotLargeThan:(NSInteger)count popErrorMsg:(BOOL)show;
- (BOOL)intStringCouldNotLessThan:(NSInteger)count popErrorMsg:(BOOL)show;

//小数str 返回正确尾数 count为要显示的最多位数
- (NSString *)getCorrectTrailByTrailCount:(NSInteger)count;

//小数最多显示尾数  超出时return NO
- (BOOL)doMostTrailCountJudge:(NSInteger)trailCount;

@end
