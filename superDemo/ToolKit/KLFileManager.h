//
//  KLFileManager.h
//  SuperDemo
//
//  Created by Rany on 16/7/7.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>

extern NSString *const kIsCopyH5ToTmp; //是否复制了H5

@interface KLFileManager : NSObject

/**
 *  查看某个目录下的所有文件
 *
 *  @param dPath 文件夹路径
 *
 *  @return 文件路径数组
 */
+ (NSArray *)contentOfDirectoryWithPath:(NSString *)dPath;

/**
 *  创建H5文件到tmp目录下
 */
+ (void)createHTMLDirectory;

@end
