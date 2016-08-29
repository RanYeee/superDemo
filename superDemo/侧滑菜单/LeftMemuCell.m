//
//  LeftMemuCell.m
//  SuperDemo
//
//  Created by Rany on 16/8/29.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "LeftMemuCell.h"

@implementation LeftMemuCell

- (void)awakeFromNib {
    [super awakeFromNib];
    
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

-(void)configureForMenuItem:(NSDictionary *)menuItem
{
    
//    NSLog(@"image>> %@,colors>> %@",menuItem[@"colors"],[self colorWithColorArray:menuItem[@"colors"]]);
    
    self.memuImageView.image = [UIImage imageNamed:menuItem[@"image"]];
    
    self.backgroundColor = [self colorWithColorArray:menuItem[@"colors"]];
    
    
}

- (UIColor *)colorWithColorArray:(NSArray *)colorArr
{

    
    CGFloat r = [colorArr[0]floatValue];
    CGFloat g = [colorArr[1]floatValue];
    CGFloat b = [colorArr[2]floatValue];
    
    return [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:1.0];
}

@end
