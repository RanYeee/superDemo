//
//  SaveImage_Util.h
//  SuperDemo
//
//  Created by Rany on 2017/5/17.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SaveImage_Util : NSObject
/**
 保存图片到document
 @param saveImage <#saveImage description#>
 @param imageName <#imageName description#>
 @param back      <#back description#>
 @return <#return value description#>
 */
+ (BOOL)saveImage:(UIImage *)saveImage ImageName:(NSString *)imageName back:(void(^)(NSString *imagePath))back;

@end
