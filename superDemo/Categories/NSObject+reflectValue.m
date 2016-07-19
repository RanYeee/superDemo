//
//  NSObject+reflectValue.m
//  CLzz
//
//  Created by Yicheng Wu on 14-6-20.
//  Copyright (c) 2014年 CL. All rights reserved.
//

#import "NSObject+reflectValue.h"
#import <objc/runtime.h>

@implementation NSObject (reflectValue)

- (void)updateSelf:(NSDictionary *)dic{
    
    if (!dic || [dic isEqual:[NSNull null]]) {
        return;
    }
    
    unsigned int outCount;
    objc_property_t *properties = class_copyPropertyList([self class], &outCount);
    for (int i=0; i<outCount; i++) {
        objc_property_t property = properties[i];
        const char *char_f = property_getName(property);
        NSString *propertyName = [NSString stringWithUTF8String:char_f];
        id propertyValue = nil;
        if ([propertyName isEqualToString:@"nid"]) {
            propertyValue = [dic objectForKey:@"id"];
//            NSLog(@"propertyValue %@",propertyValue);
//
//        } else if ([propertyName isEqualToString:@"siteAcode"]) {
//            propertyValue = [dic objectForKey:@"addressPrev"];
//            //NSLog(@"propertyValue %@",propertyValue);
        } else if ([propertyName isEqualToString:@"description"]) {
            propertyValue = [dic objectForKey:@"descr"];
        } else{
            propertyValue = [dic objectForKey:propertyName];
        }
    
        // 如果是数字类型，则完全转换为字符类型
        if ([propertyValue isKindOfClass:[NSNumber class]]) {
            propertyValue = [NSString stringWithFormat:@"%@", propertyValue];
        }
        
        if ([propertyValue isEqual:[NSNull null]]) {//处理<null>
            propertyValue = nil;
        }
        
        if (propertyValue) {
            [self setValue:propertyValue forKey:propertyName];
        }
    }
    free(properties);
}

-(BOOL)isContainProperty:(NSString *)propertyName{
    BOOL flag = NO;
//    NSLog(@"propertyName = %@",propertyName);
    NSMutableArray *array = [NSMutableArray array];
    
    unsigned int outCount;
    objc_property_t *properties = class_copyPropertyList([self class], &outCount);
    for (int i=0; i<outCount; i++) {
        objc_property_t property = properties[i];
        const char *char_f = property_getName(property);
        NSString *propertyName = [NSString stringWithUTF8String:char_f];
        [array addObject:propertyName];
    }
    
    if ([array containsObject:propertyName]) {
        flag = YES;
    }
    
    return flag;
}
@end
