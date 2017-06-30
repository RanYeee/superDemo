//
//  EDrugDynamicCell.h
//  SuperDemo
//
//  Created by Rany on 2017/6/23.
//  Copyright © 2017年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "EDrug.h"

@interface EDrugDynamicCell : UITableViewCell


/**
 初始化cell
 
 @param style cell style
 @param reuseIdentifier reuseIdentifier
 @param isShowNorms 是否显示规格
 @param isShowUseage 是否显示用法
 @param isShowDosage 是否显示用量 + 频次
 @param isShowCount 是否显示数量
 @return cell对象
 */
- (instancetype)initWithStyle:(UITableViewCellStyle)style
              reuseIdentifier:(NSString *)reuseIdentifier
                  IsShowNorms:(int)isShowNorms
                 IsShowUseage:(int)isShowUseage
                 IsShowDosage:(int)isShowDosage
                  IsShowCount:(int)isShowCount;

/**
 加载数据到cell

 @param drug drug model
 */
- (void)setupDrugCellByDrug:(EDrug *)drug;

@property(nonatomic, strong)  UILabel *titleLabel; //标题label
@property(nonatomic, strong)  UILabel *normsLabel; //规格
@property(nonatomic, assign) NSInteger index;
@property(nonatomic, assign) CGFloat cellHeight;

@end
