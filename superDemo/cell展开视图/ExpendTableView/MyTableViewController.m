//
//  MyTableViewController.m
//  ocSwift
//
//  Created by IMac on 16/4/1.
//  Copyright © 2016年 IMac. All rights reserved.
//

#import "MyTableViewController.h"
#import "ExpendCell.h"
#import "ExpendHeaderView.h"

@interface MyTableViewController ()<UITableViewDataSource,UITableViewDelegate>


@property (nonatomic, copy) NSArray *rowArray;

@property (nonatomic, copy) NSArray *sectionArray;

@property (nonatomic, strong) UITableView *tableView;

@property (nonatomic ,weak) UILabel *header;

/** 判断cell是否展开 */
@property (nonatomic ,strong) NSMutableDictionary *showDic;

@end

@implementation MyTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.tableView = [[UITableView alloc]initWithFrame:self.view.bounds style:UITableViewStyleGrouped];
    
    self.tableView.delegate = self;
    
    self.tableView.dataSource = self;
    
    [self.view addSubview:self.tableView];
    
    self.sectionArray = @[@"血压",@"血糖",@"尿酸",@"总胆固醇",@"血氧饱和度",@"BMI值",@"血红蛋白",@"尿常规"];
    
    self.rowArray = @[@"张三",@"李四",@"王五",@"赵六",@"好友",@"家人",@"朋友",@"同学",@"陌生人",@"黑名单",@"好友",@"家人",@"朋友",@"同学",@"陌生人",@"黑名单",@"好友"];
}


#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    
    return _sectionArray.count;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    
    if ([self isExpendWithIndex:section]) {
        
        return 1;
    }
    
    return 0;
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    
    ExpendCell *cell = [ExpendCell creatWithTitle:self.sectionArray[indexPath.section] inTableView:tableView section:indexPath.section];

    cell.clipsToBounds = YES;
    
    cell.selectionStyle = UITableViewCellSelectionStyleNone;
    
    return cell;
    
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath{
  
    if (indexPath.section < 2) {
        return 50 + 43 * 3;
    }else if(indexPath.section < 7){
        return 40 + 44;
    }
    return 470;
   
}


- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
    
    return 44;
}

-(CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section
{
    return 1;
}

-(UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section
{
    UIView *view = [[UIView alloc]init];
    
    view.backgroundColor = [UIColor colorWithRed:0.2941 green:0.6549 blue:0.9059 alpha:1.0];
    
    return view;
    
}

-(UIView*)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section{
    
    CGRect headerRect = CGRectMake(0, 0, self.view.bounds.size.width, 44);
    
    ExpendHeaderView *headerView = [[ExpendHeaderView alloc]initWithFrame:headerRect
                                                                 andTitle:self.sectionArray[section]
                                                               andInfoArr:@[@"50%",@"2",@"1"]
                                                                   isShow:[self isExpendWithIndex:section]];
    
    headerView.tag = section;
    
    UITapGestureRecognizer *singleRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(SingleTap:)];
    
    [headerView addGestureRecognizer:singleRecognizer];
    
    return headerView;
    
}

-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"%ld",(long)indexPath.section);
}

-(void)SingleTap:(UITapGestureRecognizer*)recognizer{
    
    NSInteger didSection = recognizer.view.tag;
    
    if (!self.showDic) {
        // 展开字典创建
        self.showDic = [[NSMutableDictionary alloc]init] ;
    }
    
    // 拿lable的tag作为字典的key
    NSString *key = [NSString stringWithFormat:@"%ld",recognizer.view.tag];
    
    //如果当前字典没有对应的值

    if (![self.showDic objectForKey:key]) {
        
        // 就把当前的key对应的值存起来
        [self.showDic setObject:@"isOn" forKey:key];
        
    }else{ // 如果展开了
        
        [self.showDic removeObjectForKey:key];
    }
    
    [self.tableView reloadSections:[NSIndexSet indexSetWithIndex:didSection] withRowAnimation:UITableViewRowAnimationFade];
    
//    [self.tableView reloadData];

}


- (BOOL)isExpendWithIndex:(NSInteger)index
{
    if ([self.showDic objectForKey:[NSString stringWithFormat:@"%ld",(long)index]]) {
        
        return YES;
        
    }else{
        
        return NO;
    }
}

@end
