//
//  NSDictionary+JSON.h
//  SmartCommunity
//
//  Created by Harvey Huang on 15/7/27.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSDictionary (JSON)

- (NSString*)jsonString;
+ (NSDictionary*)initWithJsonString:(NSString*)json;

@end
