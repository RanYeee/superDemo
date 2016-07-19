//
//  UIImage+UIImageAddition.h
//  TeamTalk
//
//  Created by Michael Scofield on 2015-01-30.
//  Copyright (c) 2015 Michael Hu. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (UIImageAddition)

+ (UIImage*)maskImage:(UIImage *)image
             withMask:(UIImage *)maskImage;

//按照UIImageOrientation的定义，利用矩阵自定义实现对应的变换；
+ (UIImage *)transformImage:(UIImage *)aImage
                   rotation:(UIImageOrientation)orientation;

@end
