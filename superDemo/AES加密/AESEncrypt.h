//
//  AESEncrypt.h
//  SuperDemo
//
//  Created by Rany on 16/9/1.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AESEncrypt : NSObject

//加密
+ (NSString *)encryptAES:(NSString *)content key:(NSString *)key;

//解密
+ (NSString *)decryptAES:(NSString *)content key:(NSString *)key;

@end
